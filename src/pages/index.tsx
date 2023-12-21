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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let totalPages = 1;
  let currentEvents: Event[] = [];
  if (events) {
    currentEvents = events.slice(startIndex, endIndex);
    totalPages = Math.ceil(events.length / itemsPerPage);
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    fetchEventList("events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handlePageChange = (newPage: number) => {
    if (events) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <h1 className="text-[36px] text-dark font-semibold text-center">Workshops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {currentEvents?.map((event) => (
          <div key={event.id} className="card card-compact bg-base-100 shadow-xl">
            <EventItem event={event} userId={Number(loggedUser?.id)} />
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="relative overflow-x-auto sm:rounded-lg flex justify-center py-2 mt-5">
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white rounded-lg px-3 py-1 mx-1 shadow-md border"
            >
              &lt;
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`rounded-lg px-3 py-1 mx-1 shadow-md border ${
                  number === currentPage ? "bg-primary text-white" : "bg-white"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-white rounded-lg px-3 py-1 mx-1 shadow-md border"
            >
              &gt;
            </button>
          </div>
        </div>
    </>
  );
}
