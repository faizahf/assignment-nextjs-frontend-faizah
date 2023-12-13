import Navbar from "@/components/Navbar/Navbar";
import useFetch from "@/hooks/useFetch";
import { Event, Merchandise } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function MerchandisePage() {
  const router = useRouter();
  const id = router.query.eventId;
  const { data: event, fetchData: fetchEventMerchandises } = useFetch<Event>();
  const [ qty, setQty ] = useState(0);

  useEffect(() => {
    fetchEventMerchandises(`events/${id}?_embed=merchandises`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(id);
  }, [id]);

  const formatCurrency = (nominal: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(nominal);
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col px-60 items-center">
        <div className="w-full">
          <h1 className="text-[36px] text-primary font-semibold">
            Merchandise
          </h1>
          {event?.merchandises &&
            event.merchandises.map((merchandise: any) => (
              <div
                className="w-full bg-[#F3EFFF] rounded-lg shadow-md px-10 my-2 py-5 flex gap-5"
                key={merchandise.id}
              >
                <div className="w-[100px]">
                  <img src={`${merchandise.image}`} />
                </div>
                <div className="w-full">
                <h6 className="font-semibold">{merchandise.name}</h6>
                <h6>{merchandise.description}</h6>
                <div className="flex justify-between">
                    <h6 className="text-primary font-semibold">{formatCurrency(merchandise.price)}</h6>
                    <div className="flex gap-2">
                            <button className={`bg-primary px-2 text-white`} disabled={qty === 0} onClick={() => setQty(qty - 1)}>-</button>
                            <span>{qty}</span>
                            <button className="bg-primary px-2 text-white" disabled={qty === merchandise.stock} onClick={() => setQty(qty + 1)}>+</button>
                            <h1>
                            {formatCurrency(merchandise.price * qty)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            ))}
          <div className="bg-[#F3EFFF] rounded-lg shadow-md my-2 px-10 py-5">
            <div className="flex justify-between">
              <h2>Total Payment</h2>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary bg-navy-blue w-1/3">
              Continue Payment
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default MerchandisePage;
