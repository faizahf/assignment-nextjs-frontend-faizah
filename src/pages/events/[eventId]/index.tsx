import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { RootState } from "@/stores/store";
import { Bookmark, Event } from "@/types";
import { formatRupiah } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";

function EventDetail() {
  const router = useRouter();
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const id = router.query.eventId;
  const { data: event, fetchData: fetchEvent } = useFetch<Event>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: bookmarkedEvent, fetchData: fetchBookmarked } = useFetch<Bookmark[]>();
  const { data: deletedBookmark, fetchData: deleteEvent } = useFetch<Event>();
  const { data: addedBookmark, fetchData: postBookmarkEvent } = useFetch<Event>();

  useEffect(() => {
    fetchEvent(`events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id]);

  const checkBookmarkStatus = async () => {
    if (loggedUser) {
      fetchBookmarked(`bookmarks?userId=${loggedUser.id}&eventId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  }

  useEffect(() => {
    checkBookmarkStatus();
  }, [event, loggedUser, deletedBookmark, addedBookmark]);

  useEffect(() => {
    if (bookmarkedEvent) {
        setIsBookmarked(bookmarkedEvent.length > 0);
    }
  }, [bookmarkedEvent])

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked && bookmarkedEvent) {
        // Unbookmark
        deleteEvent(`bookmarks/${bookmarkedEvent[0].id}`, {
          method: "DELETE",
        });
      } else {
        // Bookmark
        postBookmarkEvent("bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedUser?.id,
            eventId: id,
          }),
        });
      }

      // Update bookmark state
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
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
                    <h2 className="card-title">{formatRupiah(Number(event.price))}</h2>
                    <p>{event.date}, {event.startTime}</p>
                    <div className="card-actions justify-end">
                      <Button styles="btn" value={`${isBookmarked ? 'Unbookmark' : 'Bookmark'}`} funcOnClick={handleBookmarkToggle} />
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
                  {event.date}, {event.startTime}
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
