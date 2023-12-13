import useFetch from "@/hooks/useFetch";
import { Bookmark, Event, User } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import Button from "@/components/Button/Button";

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

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchEventList("events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const formatCurrency = (nominal: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(nominal);
  };
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
    setIsBookmarked(true);
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
    setIsBookmarked(false);
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
      <h1 className="text-[36px] text-primary font-semibold">Workshops</h1>
      <div className="grid grid-cols-4 gap-5 my-5">
        {events?.map((event) => (
          <div key={event.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={`${event.image}`} alt={`${event.name}`} />
            </figure>
            <div className="card-body">
              <div className="gap-2 w-full h-[39px] items-center flex justify-between">
                <h2 className="card-title">{event.name}</h2>
                {isBookmarked ? (
                  <FaBookmark size={24} />
                ) : (
                  <FaRegBookmark size={24} />
                )}
              </div>
              <p>{event.date}, {event.time}</p>
              <p className="text-primary font-semibold text-2xl">
                {formatCurrency(event.price)}
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
