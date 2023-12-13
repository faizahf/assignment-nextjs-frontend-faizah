import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/Modal/Modal";

function EventDetail() {
  const router = useRouter();
  const id = router.query.eventId;
  const { data: event, fetchData: fetchEvent } = useFetch<Event>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    fetchEvent(`events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
            Order Details
          </h1>
          {event && (
            <>
              <div className="w-full">
                <div className="bg-[#F3EFFF] rounded-lg shadow-md px-10 my-2 py-5">
                    <div className="font-semibold">
                      <h6>{event.name}</h6>
                    </div>
                    <div className="flex justify-between">
                      <h6>Time</h6>
                      <h6>{event.startTime}</h6>
                    </div>
                    <div className="flex justify-between">
                      <h6>Duration</h6>
                      <h6>{event.duration}</h6>
                    </div>
                    <div className="flex justify-between">
                      <h6>Price</h6>
                      <h6>
                        {formatCurrency(Number(event.price))}
                      </h6>
                    </div>
                </div>
                <div className="bg-[#F3EFFF] rounded-lg shadow-md my-2 px-10 py-5">
                  <div className="flex justify-between">
                    <h2>Total Payment</h2>
                    <h2>{formatCurrency(Number(event.price))}</h2>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-primary bg-navy-blue w-1/3" onClick={openModal}>
                    Continue Payment
                  </button>
                </div>
              </div>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className="justify-between">
                <div className="flex justify-between">
                  <h1 className="text-primary font-semibold text-[20px]">Buy Merchandise</h1>
                  <span>&times;</span>
                </div>
                <p className="my-5">Do you want to buy merchandise from this event?</p>
                <div className="w-full flex gap-3 font-semibold">
                  <button className="bg-primary w-full rounded-md text-white py-2" onClick={() => router.push(`/event/${event.id}/merchandise`)}>Yes</button>
                  <button className=" border border-primary w-full rounded-md text-primary py-2" onClick={() => router.push(`/event/${event.id}/payment`)}>No</button>
                </div>
              </div>
              </Modal>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default EventDetail;
