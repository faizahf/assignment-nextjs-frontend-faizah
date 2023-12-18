import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BiSolidDetail } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function EventListPage() {
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const { data: eventList, fetchData: fetchEventList } = useFetch<Event[]>();

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

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Events</h1>
        <div className="flex gap-3">
          <Button
            styles={"btn-primary bg-navy-blue"}
            value={"Add New Event"}
            funcOnClick={() => router.push("events/add-event")}
          />

          <div className="flex items-center relative justify-end">
            <input
              type="text"
              value={nameSearch}
              placeholder="Search by name"
              className="border p-3 rounded-lg text-sm"
              onChange={filterEventByName}
            />
            <span className="absolute text-[#A7A3FF] mr-3">
              <IoIosSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto my-5 rounded-lg">
        <table className="table bg-white">
          <thead>
            <tr className="bg-primary text-white">
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Location</th>
              <th className="text-center">Total Capacity</th>
              <th className="text-center">Remaining Capacity</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {eventList &&
              eventList.map((event) => (
                <tr key={event.id} className="text-medium hover:bg-indigo-100">
                  <td>{event.id}</td>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.startTime}</td>
                  <td>{event.price}</td>
                  <td>{event.location}</td>
                  <td className="text-center">{event.capacity.total}</td>
                  <td className="text-center">
                    {event.capacity.total - event.capacity.booked}
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button className="bg-primary p-2 rounded" onClick={() => router.push(`events/${event.id}`)}><BiSolidDetail color="white" size="20"/></button>
                    <button className="bg-yellow-500 p-2 rounded" onClick={() => router.push(`events/${event.id}/edit`)}><FaEdit color="white" size="20"/></button>
                    <button className="bg-red-600 p-2 rounded"><MdDelete color="white" size="20"/></button>
                </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EventListPage;
