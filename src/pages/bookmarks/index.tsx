import useFetch from "@/hooks/useFetch";
import { RootState } from "@/stores/store";
import { Bookmark } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Button from "@/components/Button/Button";
import { formatRupiah, getCategoryName } from "@/utils";

function BookmarksPage() {
  const router = useRouter();
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { fetchData: postBookmark } = useFetch<Bookmark>();
  const {
    data: bookmarkedEventsByUser,
    fetchData: fetchBookmarkedEventsByUser,
  } = useFetch<Bookmark[]>();
  const {
    data: bookmarkedEventByUserAndEvent,
    fetchData: fetchBookmarkedEventByUserAndEvent,
  } = useFetch<Bookmark[]>();
  const { fetchData: deleteBookmarkedEventByUserAndEvent } =
    useFetch<Bookmark[]>();

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
  }, []);

  const checkBookmarkedEvent = (currentEventId: number) => {
    fetchBookmarkedEventByUserAndEvent(
      `bookmarks?userId=${loggedUser.id}&eventId=${currentEventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("ada isinya ga:", bookmarkedEventByUserAndEvent?.length !== 0);
    return bookmarkedEventByUserAndEvent?.length !== 0;
  };

  const addBookmark = (currentEventId: number) => {
    postBookmark("bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedUser.id,
        eventId: currentEventId,
      }),
    });
  };

  const removeBookmark = (currentEventId: number) => {
    deleteBookmarkedEventByUserAndEvent(
      `bookmarks?userId=${loggedUser.id}&eventId=${currentEventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleBookmark = (eventId: number) => {
    const isBookmarked = checkBookmarkedEvent(eventId);

    if (isBookmarked) {
      removeBookmark(eventId);
    } else {
      addBookmark(eventId);
    }
  };

  return (
    <>
      <h1 className="text-[36px] text-dark font-semibold text-center">
        Bookmarked Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {bookmarkedEventsByUser?.length === 0 && (
          <div className="w-full col-span-4 text-center">
            <p className="text-xl">You haven't bookmarked any event.</p>
          </div>
        )}
        {bookmarkedEventsByUser && bookmarkedEventsByUser.map((data) => (
          <div
            key={data.event?.id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            <figure>
              <img src={`${data.event?.image}`} alt={`${data.event?.name}`} className="h-48 w-full object-cover"/>
            </figure>
            <div className="card-body">
              <div className="gap-2 w-full h-[39px] items-center flex justify-between">
                <h2 className="card-title">
                  {data.event?.name}
                  <div className="badge badge-neutral">{getCategoryName(Number(data.event?.category))}</div>
                </h2>
                {isBookmarked ? (
                  <FaBookmark size={24} />
                ) : (
                  <FaRegBookmark size={24} />
                )}
              </div>
              <p>{data.event?.date}, {data.event?.time}</p>
              <p className="text-primary font-semibold text-2xl">
                {formatRupiah(Number(data.event?.price))}
              </p>
              <div className="card-actions justify-end">
                <Button
                  styles="btn-primary bg-primary text-white"
                  value={"Details"}
                  funcOnClick={() => router.push(`/events/${data.event?.id}`)}
                ></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BookmarksPage;
