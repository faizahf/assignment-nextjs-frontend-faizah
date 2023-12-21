import useFetch from "@/hooks/useFetch";
import { Event, Merchandise, Purchase } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { formatRupiah, getDiscountByMembership, getDiscountPrice } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import {
  addMerchandise,
  decreaseQuantity,
  removeMerchandise,
  resetMerchandise,
} from "@/stores/slices/merchandise/merchandiseSlice";

function EventDetail() {
  const router = useRouter();
  const id = router.query.eventId;
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const { fetchData: postPurchase } = useFetch<Purchase>();
  const { data: event, fetchData: fetchEventMerchandises } = useFetch<Event>();
  const { fetchData: updateEvent } = useFetch<Event>();
  const { fetchData: updateMerchandise } = useFetch<Merchandise>();
  const dispatch = useDispatch();
  const merchandises = useSelector(
    (state: RootState) => state.merchandise.merchs
  );


  useEffect(() => {
    fetchEventMerchandises(`events/${id}?_embed=merchandises`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id, merchandises]);

  const handleAddMerch = (merch: Merchandise) => {
    dispatch(
      addMerchandise({
        merch: {
          id: merch.id,
          stock: merch.stock,
          price: merch.price,
          image: merch.image,
          name: merch.name,
          description: merch.description,
          eventId: merch.eventId,
          qty: 1,
        },
      })
    );
  };

  const handleDecreaseQty = (merchId: number) => {
    if (getQtyMerch(merchId) > 1) {
      dispatch(
        decreaseQuantity(
          merchandises.findIndex((data) => data.merch.id === merchId)
        )
      );
    } else {
      dispatch(removeMerchandise(merchId));
    }
  };

  const getQtyMerch = (merchId: number): number => {
    const qty = merchandises.find((data) => {
      return data.merch.id === merchId;
    })?.merch.qty;
    if (qty !== undefined) {
      return qty;
    }
    return 0;
  };

  const getSubtotalPayment = (): number => {
    let totalPayment = 0;
    if (event) {
      totalPayment += event.price;
    }
    for (const data of merchandises) {
      totalPayment += (data.merch.qty * data.merch.price);
    }
    return totalPayment;
  };

  const getTotalPayment = (discountPrice: number): number => {
    return getSubtotalPayment() - discountPrice;
  }

  const updateStock = () => {
    if (event) {
      updateEvent(`events/${id}`, {
        method: 'PATCH', 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          capacity: {
            total: event.capacity.total,
            booked: event.capacity.booked + 1,
          }
        }),
      })
    }
  }

  const handleCheckout = () => {
    postPurchase("purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedUser?.id,
        eventId: id,
        purchaseDate: new Date(),
        merchandises: merchandises,
        isPaid: false,
        paymentTotal: getTotalPayment(getDiscountPrice(getSubtotalPayment(), Number(loggedUser?.membership))),
      }),

    });

    updateStock();
    dispatch(resetMerchandise());
    router.push("/purchase-history");

  }

  return (
    <>
      <div className="w-full">
        <h1 className="text-[36px] text-primary font-semibold">
          Order Details
        </h1>
        {event && (
          <>
            <div className="w-full">
              <div className="flex gap-5">
                <div className="bg-white rounded-lg shadow-md px-10 my-2 py-5 w-full">
                  <h2 className="font-semibold text-white p-2 bg-primary rounded-md text-center mb-2">
                    Event
                  </h2>
                  <div className="font-semibold">
                    <h6>{event.name}</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>Date</h6>
                    <h6>{event.date}</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>Time</h6>
                    <h6>{event.startTime}</h6>
                  </div>
                  <div className="flex justify-between">
                    <h6>Price</h6>
                    <h6>{formatRupiah(Number(event.price))}</h6>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md px-10 my-2 py-5 w-full">
                  <h2 className="font-semibold text-white p-2 bg-primary rounded-md text-center mb-2">
                    Merchandise (optional)
                  </h2>
                  {event.merchandises && event.merchandises?.length > 0 &&
                    event.merchandises.map((merchandise: any) => (
                      <div
                        className="w-full bg-white rounded-lg shadow-md px-10 my-2 py-5 flex gap-5 border"
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
                              {merchandises.find(
                                (data) => data.merch.id === merchandise.id
                              ) && (
                                <>
                                  <button
                                    className={`bg-primary px-2 text-white`}
                                    disabled={getQtyMerch(merchandise.id) === 0}
                                    onClick={() =>
                                      handleDecreaseQty(merchandise.id)
                                    }
                                  >
                                    -
                                  </button>
                                  <span>{getQtyMerch(merchandise.id)}</span>
                                </>
                              )}
                              <button
                                className="bg-primary px-2 text-white"
                                disabled={
                                  getQtyMerch(merchandise.id) >=
                                  merchandise.stock
                                }
                                onClick={() => handleAddMerch(merchandise)}
                              >
                                +
                              </button>
                              <h1>
                                {formatRupiah(
                                  merchandise.price *
                                    getQtyMerch(merchandise.id)
                                )}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {event.merchandises && event.merchandises.length === 0 &&
                      <p className="text-center">There is no merchandise for this event.</p>
                    }
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md my-2 px-10 py-5">
                <div className="flex justify-between">
                  <h2>Order Subtotal</h2>
                  <h2>{formatRupiah(getSubtotalPayment())}</h2>
                </div>
                <div className="flex justify-between text-primary">
                  <h2>Discount ({getDiscountByMembership(Number(loggedUser?.membership))}%)</h2>
                  <h2>- {formatRupiah(getDiscountPrice(getSubtotalPayment(), Number(loggedUser?.membership)))}</h2>
                </div>
                <div className="flex justify-between font-semibold">
                  <h2>Order Total</h2>
                  <h2>{formatRupiah(getTotalPayment(getDiscountPrice(getSubtotalPayment(), Number(loggedUser?.membership))))}</h2>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="btn btn-primary bg-dark w-1/3"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EventDetail;
