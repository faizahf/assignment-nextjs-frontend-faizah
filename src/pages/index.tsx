import useFetch from "@/hooks/useFetch";
import { Bookmark, Event, User } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Button from "@/components/Button/Button";
import { formatRupiah, getCategoryName } from "@/utils";
import Image from "next/image";

export default function Home() {
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const router = useRouter();
  const { data: events, fetchData: fetchEventList } = useFetch<Event[]>();

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

  const [checkIsBookmarked, setCheckIsBookmarked] = useState(false);

  useEffect(() => {
    fetchEventList("events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const checkBookmarkedEvent = (currentEventId: number): boolean => {
    fetchBookmarkedEventByUserAndEvent(
      `bookmarks?userId=${loggedUser.id}&eventId=${currentEventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //   console.log('bookmarked events:', bookmarkedEvents);
    console.log("ada isinya ga:", bookmarkedEventByUserAndEvent);
    console.log(bookmarkedEventByUserAndEvent?.length !== 0);
    console.log(bookmarkedEventByUserAndEvent);
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
    setCheckIsBookmarked(true);
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
    setCheckIsBookmarked(false);
  };

  const handleBookmark = (eventId: number) => {
    const isBookmarked = checkBookmarkedEvent(eventId);

    console.log('handleBookmark', isBookmarked);
    if (isBookmarked) {
      removeBookmark(eventId);
    } else {
      addBookmark(eventId);
    }
  };

  return (
    <>
      <h1 className="text-[36px] text-dark font-semibold">Workshops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {events && events.map((event) => (
          <div key={event.id} className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={`${event.image}`} alt={`${event.name}`} className="h-48 w-full object-cover"/>
            </figure>
            <div className="card-body">
              <div className="gap-2 w-full h-[39px] items-center flex justify-between">
                <h2 className="card-title">
                  {event.name}
                  <div className="badge badge-neutral">{getCategoryName(event.category)}</div>
                </h2>
                {checkIsBookmarked ? (
                  <FaBookmark size={24} onClick={() => handleBookmark(event.id)} />
                ) : (
                  <FaRegBookmark size={24} onClick={() => handleBookmark(event.id)} />
                )}
              </div>
              <p>{event.date}, {event.startTime}</p>
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
          </div>
        ))}
      </div>
    </>
  );
}
