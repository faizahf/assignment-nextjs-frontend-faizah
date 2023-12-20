import useFetch from "@/hooks/useFetch";
import { Purchase } from "@/types";
import { formatRupiah } from "@/utils";
import React, { useEffect } from "react";
import { MdOutlinePayments } from "react-icons/md";

function PurchaseHistoryPage() {
  const { data: purchases, fetchData: fetchPurchases } = useFetch<Purchase[]>();

  useEffect(() => {
    fetchPurchases("purchases?_expand=event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <div>
      <h1 className="text-[36px] text-primary font-semibold">
        Purchase History
      </h1>
      {purchases &&
        purchases.map((purchase) => (
          <div
            className="border my-5 rounded-xl shadow-md border-secondary bg-white p-5"
            key={purchase.id}
          >
            <div className="text-white text-center flex justify-end mb-2">
              {purchase.isPaid ? (
                <div className="rounded-lg bg-primary px-5 py-1">Paid</div>
              ) : (
                <div className="rounded-lg bg-grey px-5 py-1">
                  Unpaid
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-8 py-2 border-t">
              <img
                src={`${purchase.event?.image}`}
                alt={`${purchase.event?.name}`}
                className="w-40 h-28 object-cover"
              />
              <div className="py-8 w-full">
                <p className="card-title capitalize">{purchase.event?.name}</p>
                <div className="flex justify-between">
                  <p>x1</p>
                  <p>{formatRupiah(Number(purchase.event?.price))}</p>
                </div>
              </div>
            </div>

            {purchase.merchandises.length !== 0 &&
              purchase.merchandises.map((data) => (
                <div
                  className="flex flex-col lg:flex-row w-full gap-8 border-t py-2"
                  key={data.merch.id}
                >
                  <img
                    src={`${data.merch.image}`}
                    alt={`${data.merch.name}`}
                    className="w-40 h-28 object-cover"
                  />
                  <div className="py-8 w-full">
                    <p className="card-title capitalize">{data.merch.name}</p>
                    <div className="flex justify-between">
                      <p>x{data.merch.qty}</p>
                      <p>{formatRupiah(data.merch.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex gap-3 justify-end items-center border-t py-2">
              <p className="flex gap-2 items-center">
                <MdOutlinePayments color="#7848F4" />
                Total Payment:{" "}
              </p>
              <p className="text-primary text-2xl">
                {formatRupiah(purchase.paymentTotal)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PurchaseHistoryPage;
