import useFetch from "@/hooks/useFetch";
import { Bookmark, Event, User } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import EventItem from "@/components/EventItem/EventItem";

export default function Home() {
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const { data: events, fetchData: fetchEventList } = useFetch<Event[]>();

  useEffect(() => {
    fetchEventList("events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return (
    <>
      <h1 className="text-[36px] text-dark font-semibold text-center">Workshops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {events && events.map((event) => (
          <div key={event.id} className="card card-compact bg-base-100 shadow-xl">
            <EventItem event={event} userId={Number(loggedUser?.id)} />
          </div>
        ))}
      </div>
    </>
  );
}
