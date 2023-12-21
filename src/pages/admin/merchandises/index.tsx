import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { Merchandise } from "@/types";
import { formatRupiah } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MerchandiseListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState<Merchandise>();
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const { data: merchList, fetchData: fetchMerchList } = useFetch<Merchandise[]>();
  const { fetchData: fetchDeleteMerchandise } = useFetch<Merchandise>();

  useEffect(() => {
    fetchMerchList("merchandises?_expand=event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const filterMerchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
    fetchMerchList(`merchandises?_expand=event&name_like=${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const openModal = (merch: Merchandise) => {
    setSelectedMerch(merch);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteMerchandise = () => {
    fetchDeleteMerchandise(`merchandises/${selectedMerch?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchMerchList("merchandises", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    closeModal();

    toast.success("Merchandise successfully deleted!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "light",
      hideProgressBar: true,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Merchandises</h1>
        <div className="flex gap-3">
          <Button
            styles={"btn-primary bg-dark"}
            value={"Add New Merchandise"}
            funcOnClick={() => router.push("merchandises/add")}
          />

          <div className="flex items-center relative justify-end">
            <input
              type="text"
              value={nameSearch}
              placeholder="Search by name"
              className="border p-3 rounded-lg text-sm"
              onChange={filterMerchByName}
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
              <th>Event</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {merchList &&
              merchList.map((merch) => (
                <tr key={merch.id} className="text-medium hover:bg-indigo-100">
                  <td>{merch.id}</td>
                  <td>{merch.name}</td>
                  <td>{merch.event?.name}</td>
                  <td>{formatRupiah(merch.price)}</td>
                  <td>{merch.stock}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="bg-yellow-500 p-2 rounded"
                      onClick={() => router.push(`merchandises/${merch.id}/edit`)}
                    >
                      <FaEdit color="white" size="20" />
                    </button>
                    <button
                      className="bg-red-600 p-2 rounded"
                      onClick={() => openModal(merch)}
                    >
                      <MdDelete color="white" size="20" />
                    </button>
                  </td>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <div className="flex justify-between">
                        <h1 className="text-primary font-semibold text-[20px]">
                          Confirm Delete Merchandise
                        </h1>
                        <span className="cursor-pointer" onClick={closeModal}>&times;</span>
                      </div>
                      <p className="py-10">
                        Are you sure want to delete{" "}
                        <span className="text-primary">
                          {selectedMerch?.name}
                        </span>{" "}
                        ?
                      </p>
                      <div className="flex gap-3 font-semibold justify-center">
                        <Button
                          styles="btn-primary bg-primary rounded-md text-white w-1/3 py-2"
                          value="Yes"
                          funcOnClick={handleDeleteMerchandise}
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

export default MerchandiseListPage;
