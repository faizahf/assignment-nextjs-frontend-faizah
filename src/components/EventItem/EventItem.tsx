import useFetch from "@/hooks/useFetch";
import { Bookmark, Event } from "@/types";
import { formatRupiah, getCategoryName } from "@/utils";
import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Button from "../Button/Button";
import { useRouter } from "next/router";

type EventItemProps = {
    event: Event, 
    userId: number
}

function EventItem({event, userId}: EventItemProps): JSX.Element {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: bookmarkedEvent, fetchData: fetchBookmarked } = useFetch<Bookmark[]>();
  const { data: deletedBookmark, fetchData: deleteEvent } = useFetch<Event>();
  const { data: addedBookmark, fetchData: postBookmarkEvent } = useFetch<Event>();

  const checkBookmarkStatus = async () => {
    fetchBookmarked(`bookmarks?userId=${userId}&eventId=${event.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    }

  useEffect(() => {
    checkBookmarkStatus();
  }, [event, userId, deletedBookmark, addedBookmark]);

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
            userId: userId,
            eventId: event.id,
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
      <figure>
        <img
          src={`${event.image}`}
          alt={`${event.name}`}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="gap-2 w-full h-[39px] items-center flex justify-between">
          <h2 className="card-title">
            {event.name}
            <div className="badge badge-neutral">
              {getCategoryName(event.category)}
            </div>
          </h2>
          <button onClick={handleBookmarkToggle}>
            {isBookmarked ? (
              <FaBookmark size={24} />
            ) : (
              <FaRegBookmark size={24} />
            )}
          </button>
        </div>
        <p>
          {event.date}, {event.startTime}
        </p>
        <p className="text-primary font-semibold text-2xl">
          {formatRupiah(event.price)}
        </p>
        <div className="card-actions justify-end">
          <Button
            styles="btn-primary bg-primary text-white"
            value={"Details"}
            funcOnClick={() => router.push(`/events/${event.id}`)}
          ></Button>
        </div>
      </div>
    </>
  );
}

export default EventItem;
