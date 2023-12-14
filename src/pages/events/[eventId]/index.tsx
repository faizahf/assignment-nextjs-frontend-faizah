import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function EventDetail() {
  const router = useRouter();
  const id = router.query.eventId;
  const { data: event, fetchData: fetchEvent } = useFetch<Event>();

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
      {event && (
        <>
          <div className="relative">
            <img
              src={`${event.image}`}
              alt={`${event.name}`}
              className="rounded-lg brightness-50 w-full max-h-[450px] object-cover"
            />
              <Button
                styles={"btn-primary bg-primary text-[16px] absolute left-10 top-10 flex"}
                value={"< Back"}
                funcOnClick={() => router.push("/")}
              />
            <div className="absolute -translate-y-2/4 top-2/4 flex gap-10 px-10">
                <h1 className="text-[64px] font-semibold text-white self-center">
                  {event.name}
                </h1>
                <div className="card w-96 bg-white translate-x-1/3">
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{formatCurrency(Number(event.price))}</h2>
                    <p>{event.date}, {event.time}</p>
                    <div className="card-actions justify-end">
                      <button className="btn">Bookmark</button>
                      <button className="btn btn-primary bg-primary" onClick={() => router.push(`${event.id}/order`)}>Book Now</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-20 p-10">
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold mb-5">Description</h2>
              <p>{event.description}</p>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-semibold mb-5">Time</h2>
                <span className="flex gap-5">
                  <FaClock color="#7848F4" /> 
                  {event.date}, {event.time}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-5">Location</h2>
                <span className="flex gap-5">
                  <FaLocationDot color="#7848F4" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EventDetail;
