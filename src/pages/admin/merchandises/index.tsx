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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let totalPages = 1;
  let currentMerchs: Merchandise[] = [];
  if (merchList) {
    currentMerchs = merchList.slice(startIndex, endIndex);
    totalPages = Math.ceil(merchList.length / itemsPerPage);
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  const handlePageChange = (newPage: number) => {
    if (merchList) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (column: string, order: string) => {
    fetchMerchList(`merchandises?_sort=${column}&_order=${order}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Merchandises</h1>

        <div className="flex flex-col md:flex-row items-center relative justify-end">
            <Button
              styles={"btn-primary bg-dark"}
              value={"Add New Merchandise"}
              funcOnClick={() => router.push("merchandises/add")}
            />
          <div>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn bg-white m-1 border border-secondary shadow-md">Sort By</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-white shadow-md border-secondary rounded-box w-52">
                <li><a onClick={() => handleSort('eventId', 'asc')}>Event - Asc</a></li>
                <li><a onClick={() => handleSort('eventId', 'desc')}>Event - Desc</a></li>
                <li><a onClick={() => handleSort('price', 'asc')}>Price - Asc</a></li>
                <li><a onClick={() => handleSort('price', 'desc')}>Price - Desc</a></li>
                <li><a onClick={() => handleSort('stock', 'asc')}>Stock - Asc</a></li>
                <li><a onClick={() => handleSort('stock', 'desc')}>Stock - Desc</a></li>
              </ul>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={nameSearch}
              placeholder="Search by name"
              className="border border-secondary shadow-md p-3 rounded-lg text-sm"
              onChange={filterMerchByName}
            />
            <span className="absolute text-[#A7A3FF] right-3 top-5">
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
            {currentMerchs?.map((merch) => (
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

        {/* pagination */}
        <div className="relative overflow-x-auto sm:rounded-lg flex justify-end mt-5 py-2">
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
      </div>
    </>
  );
}

export default MerchandiseListPage;
