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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let totalPages = 1;
  let currentBookmarkedEvents: Bookmark[] = [];
  if (bookmarkedEventsByUser) {
    currentBookmarkedEvents = bookmarkedEventsByUser.slice(startIndex, endIndex);
    totalPages = Math.ceil(bookmarkedEventsByUser.length / itemsPerPage);
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  useEffect(() => {
    fetchBookmarkedEventsByUser(
      `bookmarks?userId=${loggedUser?.id}&_expand=event`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [])

  const handlePageChange = (newPage: number) => {
    if (bookmarkedEventsByUser) {
      setCurrentPage(newPage);
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
            <p className="text-xl">You have not bookmarked any event.</p>
          </div>
        )}
        {currentBookmarkedEvents?.map((data) => (
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

export default BookmarksPage;
