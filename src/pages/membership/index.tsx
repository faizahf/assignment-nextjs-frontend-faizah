import { formatRupiah } from "@/utils";
import React, { useEffect } from "react";
import { MdDiscount } from "react-icons/md";
import { FaHourglassStart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import { updateBalance, updateMembership } from "@/stores/slices/user/userSlice";

function MembershipPage() {
  const silverPrice = 200000;
  const goldPrice = 250000;
  const platinumPrice = 300000;

  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const userId = loggedUser?.id;
  const { data: user, fetchData: updateUser } = useFetch<User>();

  const handleJoinMember = (price: number, membership: number) => {
    if (loggedUser) {
        if (loggedUser?.balance < price) {
          toast.error("Your SkillUpPay balance is not sufficient!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            theme: "light",
            hideProgressBar: true,
          });
        } else {
            updateUser(`users/${userId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    membership: membership,
                    balance: (loggedUser.balance - price)
                })
            })
            dispatch(updateBalance(loggedUser.balance - price));
            dispatch(updateMembership(membership));

            if (user?.membership !== 0) {
                toast.success("Successfully joined membership!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    theme: "light",
                    hideProgressBar: true,
                  });
            }
        }
    }
  };
  return (
    <>
      <div className="w-full m-auto">
        <h1 className="text-[36px] text-dark font-semibold text-center">
          Membership
        </h1>

        {loggedUser?.membership === 0 && (
          <div className="flex flex-wrap gap-5 justify-between my-10">
            {/* silver */}
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-dark py-10">
              <div className="w-full h-52 flex flex-col gap-5 justify-center">
                <h2 className="uppercase text-center text-6xl font-black justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-300">
                  Silver
                </h2>
                <h3 className="font-bold text-3xl text-white text-center">
                  {formatRupiah(silverPrice)}
                </h3>
              </div>
              <div className="px-6">
                <span className="text-white flex gap-3 text-lg my-2">
                  <MdDiscount size="30" />
                  <p className="text-white">
                    10% off every purchase event & merchandise
                  </p>
                </span>
                <span className="text-white flex gap-3 text-lg my-2">
                  <FaHourglassStart size="20" />
                  <p className="text-white">Lifetime membership</p>
                </span>
              </div>
              <div className="px-6 py-10 flex justify-center items-center">
                <button
                  className="inline-block rounded-full px-3 py-1 text-2xl font-semibold text-dark mr-2 mb-2 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400 shadow-lg justify-center"
                  onClick={() => handleJoinMember(silverPrice, 1)}
                >
                  Join Now
                </button>
              </div>
            </div>

            {/* gold */}
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-dark py-10">
              <div className="w-full h-52 flex flex-col gap-5 justify-center">
                <h2 className="uppercase text-center text-6xl font-black justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-600 to-amber-300">
                  Gold
                </h2>
                <h3 className="font-bold text-3xl mb-2 text-white text-center">
                  {formatRupiah(goldPrice)}
                </h3>
              </div>
              <div className="px-6">
                <span className="text-white flex gap-3 text-lg my-2">
                  <MdDiscount size="30" />
                  <p className="text-white">
                    15% off every purchase event & merchandise
                  </p>
                </span>
                <span className="text-white flex gap-3 text-lg my-2">
                  <FaHourglassStart size="20" />
                  <p className="text-white">Lifetime membership</p>
                </span>
              </div>
              <div className="px-6 py-10 flex justify-center items-center">
                <button
                  className="inline-block rounded-full px-3 py-1 text-2xl font-semibold text-dark mr-2 mb-2 bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-500 shadow-lg justify-center"
                  onClick={() => {
                    handleJoinMember(goldPrice, 2);
                  }}
                >
                  Join Now
                </button>
              </div>
            </div>

            {/* platinum */}
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-dark py-10">
              <div className="w-full h-52 flex flex-col gap-5 justify-center">
                <h2 className="uppercase text-center text-6xl font-black justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-500 to-slate-400">
                  Platinum
                </h2>
                <h3 className="font-bold text-3xl mb-2 text-white text-center">
                  {formatRupiah(platinumPrice)}
                </h3>
              </div>
              <div className="px-6">
                <span className="text-white flex gap-3 text-lg my-2">
                  <MdDiscount size="30" />
                  <p className="text-white">
                    20% off every purchase event & merchandise
                  </p>
                </span>
                <span className="text-white flex gap-3 text-lg my-2">
                  <FaHourglassStart size="20" />
                  <p className="text-white">Lifetime membership</p>
                </span>
              </div>
              <div className="px-6 py-10 flex justify-center items-center">
                <button
                  className="inline-block rounded-full px-3 py-1 text-2xl font-semibold text-dark mr-2 mb-2 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 shadow-lg justify-center"
                  onClick={() => handleJoinMember(platinumPrice, 3)}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}

        {loggedUser?.membership !== 0 && (
          <div className="max-w-xl m-auto justify-center rounded-xl overflow-hidden shadow-lg bg-dark p-10">
            <div className="w-full h-52 flex flex-col gap-5 justify-center">
              <p className="text-white text-center">Your membership is</p>

              {loggedUser?.membership === 1 && (
                <h2 className="uppercase text-center text-6xl font-black justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-300">
                  Silver
                </h2>
              )}

              {loggedUser?.membership === 2 && (
                <h2 className="uppercase text-center text-6xl font-black justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-600 to-amber-300">
                  Gold
                </h2>
              )}

              {loggedUser?.membership === 3 && (
                <h2 className="uppercase text-center text-6xl font-black justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-500 to-slate-400">
                  Platinum
                </h2>
              )}
            </div>
            <div className="px-6">
              <span className="text-white flex gap-3 text-lg my-2">
                <MdDiscount size="30" />
              {loggedUser?.membership === 1 && (
                <p className="text-white">
                  10% off every purchase event & merchandise
                </p>
              )}
              {loggedUser?.membership === 2 && (
                <p className="text-white">
                  15% off every purchase event & merchandise
                </p>
              )}
              {loggedUser?.membership === 3 && (
                <p className="text-white">
                  20% off every purchase event & merchandise
                </p>
              )}
              </span>
              <span className="text-white flex gap-3 text-lg my-2">
                <FaHourglassStart size="20" />
                <p className="text-white">Lifetime membership</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MembershipPage;
