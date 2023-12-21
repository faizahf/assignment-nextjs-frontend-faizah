import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import EventItem from "@/components/EventItem/EventItem";
import { IoIosSearch } from "react-icons/io";

export default function Home() {
  const [nameSearch, setNameSearch] = useState("");
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

  const filterEventByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
    fetchEventList(`events?name_like=${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handlePageChange = (newPage: number) => {
    if (events) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (column: string, order: string) => {
    fetchEventList(`events?_sort=${column}&_order=${order}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      <h1 className="text-[36px] text-dark font-semibold text-center">
        Workshops
      </h1>
      <div className="flex flex-col md:flex-row items-center relative justify-end">
        <div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn bg-white m-1 border border-secondary shadow-md">Sort By</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-white shadow-md border-secondary rounded-box w-52">
              <li><a onClick={() => handleSort('startTime', 'asc')}>Start Time - Asc</a></li>
              <li><a onClick={() => handleSort('startTime', 'desc')}>Start Time - Desc</a></li>
              <li><a onClick={() => handleSort('duration', 'asc')}>Duration - Asc</a></li>
              <li><a onClick={() => handleSort('duration', 'desc')}>Duration - Desc</a></li>
              <li><a onClick={() => handleSort('price', 'asc')}>Price - Asc</a></li>
              <li><a onClick={() => handleSort('price', 'desc')}>Price - Desc</a></li>
              <li><a onClick={() => handleSort('category', 'asc')}>Category - Asc</a></li>
              <li><a onClick={() => handleSort('category', 'desc')}>Category - Desc</a></li>
            </ul>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={nameSearch}
            placeholder="Search by name"
            className="border border-secondary shadow-md p-3 rounded-lg text-sm"
            onChange={filterEventByName}
          />
          <span className="absolute text-[#A7A3FF] right-3 top-5">
            <IoIosSearch />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {currentEvents?.map((event) => (
          <div
            key={event.id}
            className="card card-compact bg-base-100 shadow-xl"
          >
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
