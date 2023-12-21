import useFetch from "@/hooks/useFetch";
import { RootState } from "@/stores/store";
import { Bookmark } from "@/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventItem from "@/components/EventItem/EventItem";

function BookmarksPage() {
  const loggedUser = useSelector((state: RootState) => state.user.data);

  const {
    data: bookmarkedEventsByUser,
    fetchData: fetchBookmarkedEventsByUser,
  } = useFetch<Bookmark[]>();
  
  useEffect(() => {
    fetchBookmarkedEventsByUser(
      `bookmarks?userId=${loggedUser.id}&_expand=event`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [])

  return (
    <>
      <h1 className="text-[36px] text-dark font-semibold text-center">
        Bookmarked Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {bookmarkedEventsByUser?.length === 0 && (
          <div className="w-full col-span-4 text-center">
            <p className="text-xl">You have not bookmarked any event.</p>
          </div>
        )}
        {bookmarkedEventsByUser && bookmarkedEventsByUser.map((data) => (
          <div
            key={data.event?.id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            {data.event &&
              <EventItem event={data.event} userId={Number(loggedUser?.id)} />
            }
          </div>
        ))}
      </div>
    </>
  );
}

export default BookmarksPage;
