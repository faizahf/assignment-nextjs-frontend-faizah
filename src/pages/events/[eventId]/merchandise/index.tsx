import Button from "@/components/Button/Button";
import Navbar from "@/components/Navbar/Navbar";
import useFetch from "@/hooks/useFetch";
import { addMerchandise, decreaseQuantity, removeMerchandise } from "@/stores/slices/merchandise/merchandiseSlice";
import { RootState } from "@/stores/store";
import { Event, Merchandise } from "@/types";
import { formatRupiah } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MerchandisePage() {
  const router = useRouter();
  const id = router.query.eventId;
  const { data: event, fetchData: fetchEventMerchandises } = useFetch<Event>();
  const dispatch = useDispatch();
  const merchandises = useSelector((state: RootState) => state.merchandise.merchs);

  useEffect(() => {
    fetchEventMerchandises(`events/${id}?_embed=merchandises`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id, merchandises]);

  const handleAddMerch = (merch: Merchandise) => {
    dispatch(addMerchandise({
      merch: {
        id: merch.id,
        stock: merch.stock,
        price: merch.price,
        image: merch.image,
        name: merch.name,
        description: merch.description,
        eventId: merch.eventId,
        qty: 1,
      }
    }));
  }

  useEffect(() => {

    console.log('merchs:', merchandises);
  }, [merchandises])

  const handleDecreaseQty = (merchId: number) => {
    if (getQtyMerch(merchId) > 1) {
      dispatch(decreaseQuantity(merchandises.findIndex(data => data.merch.id === merchId)));
    } else {
      dispatch(removeMerchandise(merchId));
    }
  }

  const getQtyMerch = (merchId: number): number | undefined => {
    const qty = merchandises.find(data => {return data.merch.id === merchId})?.merch.qty
    if (qty !== undefined) {
      return qty;
    }
    return 0;
  }

  const getTotalPayment = (): number => {
    let totalPayment = 0;
    for (const data of merchandises) {
      totalPayment += (data.merch.qty * data.merch.price);
    }
    return totalPayment;
  }

  return (
    <>
      <div className="w-full">
        <h1 className="text-[36px] text-primary font-semibold">Merchandise</h1>
        {event?.merchandises &&
          event.merchandises.map((merchandise: any) => (
            <div
              className="w-full bg-white rounded-lg shadow-md px-10 my-2 py-5 flex gap-5"
              key={merchandise.id}
            >
              <div className="w-[100px]">
                <img src={`${merchandise.image}`} />
              </div>
              <div className="w-full">
                <h6 className="font-semibold">{merchandise.name}</h6>
                <h6>{merchandise.description}</h6>
                <div className="flex justify-between">
                  <h6 className="text-primary font-semibold">
                    {formatRupiah(merchandise.price)}
                  </h6>
                  <div className="flex gap-2">
                    {merchandises.find(data => data.merch.id === merchandise.id)
                    &&
                      <>
                        <button
                        className={`bg-primary px-2 text-white`}
                        disabled={getQtyMerch(merchandise.id) === 0}
                        onClick={() => handleDecreaseQty(merchandise.id)}
                      >
                        -
                      </button>
                      <span>{getQtyMerch(merchandise.id)}</span>
                      </>
                    }
                    <button
                      className="bg-primary px-2 text-white"
                      disabled={getQtyMerch(merchandise.id) >= merchandise.stock}
                      onClick={() => handleAddMerch(merchandise)}
                    >
                      +
                    </button>
                    <h1>{formatRupiah(merchandise.price * getQtyMerch(merchandise.id))}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="bg-white rounded-lg shadow-md my-2 px-10 py-5">
          <div className="flex justify-between">
            <h2>Total Payment</h2>
            <h2>{formatRupiah(getTotalPayment())}</h2>
          </div>
        </div>
        <div className="flex justify-end">
          <Button styles="btn-primary bg-navy-blue w-1/3"
          value="Continue Payment"  funcOnClick={() => router.push(`/events/${id}/payment`)}/>
        </div>
      </div>
    </>
  );
}

export default MerchandisePage;
