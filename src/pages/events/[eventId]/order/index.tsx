import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { formatRupiah } from "@/utils";

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

  return (
    <>
      <div className="w-full">
        <h1 className="text-[36px] text-primary font-semibold">
          Order Details
        </h1>
        {event && (
          <>
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-md px-10 my-2 py-5">
                <div className="font-semibold">
                  <h6>{event.name}</h6>
                </div>
                <div className="flex justify-between">
                  <h6>Date</h6>
                  <h6>{event.date}</h6>
                </div>
                <div className="flex justify-between">
                  <h6>Time</h6>
                  <h6>{event.time}</h6>
                </div>
                <div className="flex justify-between">
                  <h6>Price</h6>
                  <h6>{formatRupiah(Number(event.price))}</h6>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md my-2 px-10 py-5">
                <div className="flex justify-between">
                  <h2>Total Payment</h2>
                  <h2>{formatRupiah(Number(event.price))}</h2>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="btn btn-primary bg-navy-blue w-1/3"
                  onClick={openModal}
                >
                  Continue Payment
                </button>
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className="justify-between">
                <div className="flex justify-between">
                  <h1 className="text-primary font-semibold text-[20px]">
                    Buy Merchandise
                  </h1>
                  <span>&times;</span>
                </div>
                <p className="my-5">
                  Do you want to buy merchandise from this event?
                </p>
                <div className="flex gap-3 font-semibold justify-center">
                  <Button
                    styles="btn-primary bg-primary rounded-md text-white w-1/3 py-2"
                    value="Yes"
                    funcOnClick={() =>
                      router.push(`/events/${event.id}/merchandise`)
                    }
                  />
                  <Button
                    styles="border border-primary rounded-md text-primary w-1/3 py-2"
                    value="No"
                    funcOnClick={() => router.push(`/events/${event.id}/payment`)}
                  />
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}

export default EventDetail;
