import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
  }, []);
  

  return (
        <>
            <div>
                <h1>Event Detail</h1>

            </div>
        </>
    );
}

export default EventDetail;
