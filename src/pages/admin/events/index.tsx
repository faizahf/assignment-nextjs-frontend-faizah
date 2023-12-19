import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatRupiah, getCategoryName } from "@/utils";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const { data: eventList, fetchData: fetchEventList } = useFetch<Event[]>();
  const { fetchData: fetchDeleteEvent } = useFetch<Event>();

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

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteEvent = () => {
    fetchDeleteEvent(`events/${selectedEvent?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchEventList("events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    closeModal();

    toast.success("Event successfully deleted!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "light",
      hideProgressBar: true,
    });
  };

  return (
    <>
      <div className="flex gap-5 justify-between items-center overflow-x-auto">
        <h1 className="text-2xl font-semibold">Events</h1>
        <div className="flex gap-3">
          <Button
            styles={"btn-primary bg-navy-blue"}
            value={"Add New Event"}
            funcOnClick={() => router.push("events/add")}
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
              <th>Category</th>
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
                  <td>{getCategoryName(event.category)}</td>
                  <td>{event.date}</td>
                  <td>{event.startTime}</td>
                  <td>{formatRupiah(event.price)}</td>
                  <td>{event.location}</td>
                  <td className="text-center">{event.capacity.total}</td>
                  <td className="text-center">
                    {event.capacity.total - event.capacity.booked}
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="bg-yellow-500 p-2 rounded"
                      onClick={() => router.push(`events/${event.id}/edit`)}
                    >
                      <FaEdit color="white" size="20" />
                    </button>
                    <button
                      className="bg-red-600 p-2 rounded"
                      onClick={() => openModal(event)}
                    >
                      <MdDelete color="white" size="20" />
                    </button>
                  </td>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <div className="flex justify-between">
                        <h1 className="text-primary font-semibold text-[20px]">
                          Confirm Delete Event
                        </h1>
                        <span className="cursor-pointer" onClick={closeModal}>&times;</span>
                      </div>
                      <p className="py-10">
                        Are you sure want to delete{" "}
                        <span className="text-primary">
                          {selectedEvent?.name}
                        </span>{" "}
                        ?
                      </p>
                      <div className="flex gap-3 font-semibold justify-center">
                        <Button
                          styles="btn-primary bg-primary rounded-md text-white w-1/3 py-2"
                          value="Yes"
                          funcOnClick={handleDeleteEvent}
                        />
                        <Button
                          styles="btn-outline rounded-md text-primary w-1/3 py-2"
                          value="No"
                          funcOnClick={closeModal}
                        />
                      </div>
                  </Modal>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EventListPage;
