import useFetch from "@/hooks/useFetch";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Event, Purchase, User } from "@/types";
import Button from "@/components/Button/Button";
import { useDispatch } from "react-redux";
import { resetMerchandise } from "@/stores/slices/merchandise/merchandiseSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { updateBalance } from "@/stores/slices/user/userSlice";
import { formatRupiah } from "@/utils";
import { PURGE } from "redux-persist";

function PaymentPage() {
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const { data: purchase, fetchData: fetchPurchase } = useFetch<Purchase>();
  const { fetchData: updatePurchase } = useFetch<Purchase>();
  const router = useRouter();
  const dispatch = useDispatch();
  const id = router.query.purchaseId;
  const { data: user, fetchData: fetchUser } = useFetch<User>();

  useEffect(() => {
    fetchPurchase(`purchases/${id}?_expand=event`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
  }, [id]);

  const getTotalPayment = () => {
    let totalPayment = 0;
    if (purchase?.event) {
      totalPayment += purchase?.event?.price;
    }
    if (purchase) {
        for (const data of purchase.merchandises) {
          totalPayment += data.merch.qty * data.merch.price;
        }
    }
    return totalPayment;
  };

  const decreaseBalance = () => {
    if (loggedUser) {
      const newBalance = loggedUser.balance - getTotalPayment();
      dispatch(updateBalance(newBalance));
      fetchUser(`users/${loggedUser.id}`, {
        method: 'PATCH', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          balance: newBalance,
        }),
      })
    }
  }

  const handlePurchase = () => {
    if (loggedUser) {
      if (loggedUser.balance - getTotalPayment() >= 0) {
        updatePurchase(`purchases/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isPaid: true,
          }),
        });
        decreaseBalance();
        dispatch(resetMerchandise());
        router.push("/purchase-history");
        toast.success('Payment success!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "light",
            hideProgressBar: true,
        });
      } else {
        toast.error('Your balance is not sufficicent! Top up your SkillUpPay first.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          theme: "light",
          hideProgressBar: true,
      });
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="text-[36px] text-primary font-semibold">Payment</h1>
      <div className="border-secondary border rounded-xl w-full p-5 shadow-md bg-white">
        <h2 className="font-semibold text-2xl">Order Summary</h2>
        {purchase && purchase.event && 
            <table className="w-full">
            <tr className="font-semibold border-t">Event</tr>
            <tr>
                <td>{purchase?.event?.name}</td>
                <td className="text-end">x1</td>
                <td className='text-end'>{formatRupiah(Number(purchase?.event?.price))}</td>
            </tr>

            {purchase?.merchandises.length !== 0 && 
            <>
                <tr className="font-semibold border-t">Merchandise</tr>
                {purchase?.merchandises.map((data) => (
                    <tr key={data.merch.id}>
                        <td>{data.merch.name}</td>
                        <td className="text-end">x{data.merch.qty}</td>
                        <td className='text-end'>{formatRupiah(Number(data.merch.price))}</td>
                    </tr>
                ))
                }
            </>
            }
            <tr className="border-t">
            <td className="font-semibold">Total Payment</td>
            <td colSpan={2} className="text-end font-semibold text-primary">{formatRupiah(getTotalPayment())}</td>
            </tr>
            </table>
        }
      </div>

      <div className="border-secondary border-2 rounded-xl p-5 shadow-md bg-white">
        <h2 className="font-semibold text-2xl mb-2">Choose Payment Method</h2>
        <div className="border shadow-md rounded-lg p-5 w-1/3">
          <div>
            <input type="radio" value={'SkillUpPay'} required defaultChecked /> SkillUpPay
          </div>
          <small>Balance amount: {formatRupiah(Number(loggedUser?.balance))}</small>

        </div>
      </div>
      <Button
          styles={"btn-primary bg-primary"}
          value={"Pay Now"}
          funcOnClick={handlePurchase}
        />
    </div>
  );
}

export default PaymentPage;
