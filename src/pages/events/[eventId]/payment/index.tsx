import useFetch from "@/hooks/useFetch";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Event, Purchase } from "@/types";
import Button from "@/components/Button/Button";

function PaymentPage() {
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const { data: event, fetchData: fetchEvent } = useFetch<Event>();
  const { fetchData: fetchPurchase } = useFetch<Purchase>();
  const router = useRouter();
  const id = router.query.eventId;
  const merchandises = useSelector((state: RootState) => state.merchandise);

  useEffect(() => {
    fetchEvent(`events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id]);

  const getTotalPayment = () => {
    let totalPayment = 0;
    if (event) {
      totalPayment += event?.price;
    }
    for (const merch of merchandises) {
      totalPayment += merch.qty * merch.price;
    }
    return totalPayment;
  };

  const handlePurchase = () => {
    if (loggedUser?.balance > getTotalPayment()) {
      fetchPurchase("purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedUser?.id,
          eventId: 1,
          purchaseDate: Date.now(),
          merchandises: merchandises,
          isPaid: false,
          paymentTotal: getTotalPayment(),
        }),
      });
      router.push("/");
    }
  };

  return (
    <div className="flex">
      <div>
        <h1>Choose Payment Method</h1>
        <h6>SkillUp-Wallet Balance</h6>
        <h6>{loggedUser?.balance}</h6>
      </div>
      <div className="border">
        <h2>Order Summary</h2>
        <div>1x {event?.name}</div>
        <h2>Merchandise</h2>
        {merchandises &&
          merchandises.map((merch) => (
            <>
              <div className="flex gap-5">
                <p>{merch.name}</p>
                <p>
                  {merch.qty} x {merch.price}
                </p>
              </div>
            </>
          ))}
        <div>{getTotalPayment()}</div>
        <Button
          styles={"btn-primary bg-primary"}
          value={"Confirm your order"}
          funcOnClick={handlePurchase}
        />
      </div>
    </div>
  );
}

export default PaymentPage;
