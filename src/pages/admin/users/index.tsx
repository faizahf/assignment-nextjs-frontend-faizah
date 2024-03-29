import useFetch from "@/hooks/useFetch";
import { User } from "@/types";
import { formatRupiah, getMembershipName } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserListPage() {
  const { data: userList, fetchData: fetchUserList } = useFetch<User[]>();
  const [nameSearch, setNameSearch] = useState("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const { fetchData: fetchDeleteUser } = useFetch<User>();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let totalPages = 1;
  let currentUsers: User[] = [];
  if (userList) {
    currentUsers = userList.slice(startIndex, endIndex);
    totalPages = Math.ceil(userList.length / itemsPerPage);
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserList("users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const filterUserByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSearch(e.target.value);
    fetchUserList(`users?name_like=${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDeleteUser = () => {
    fetchDeleteUser(`users/${selectedUser?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchUserList("users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    closeModal();

    toast.success("User successfully deleted!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      theme: "light",
      hideProgressBar: true,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (userList) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (column: string, order: string) => {
    fetchUserList(`users?_sort=${column}&_order=${order}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      <div className="flex gap-5 justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex gap-3">
        <div className="flex flex-col md:flex-row items-center relative justify-end">
          <div>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn bg-white m-1 border border-secondary shadow-md">Sort By</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-white shadow-md border-secondary rounded-box w-52">
                <li><a onClick={() => handleSort('name', 'asc')}>Name - Asc</a></li>
                <li><a onClick={() => handleSort('name', 'desc')}>Name - Desc</a></li>
                <li><a onClick={() => handleSort('email', 'asc')}>Email - Asc</a></li>
                <li><a onClick={() => handleSort('email', 'desc')}>Email - Desc</a></li>
                <li><a onClick={() => handleSort('balance', 'asc')}>Balance - Asc</a></li>
                <li><a onClick={() => handleSort('balance', 'desc')}>Balance - Desc</a></li>
              </ul>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={nameSearch}
              placeholder="Search by name"
              className="border border-secondary shadow-md p-3 rounded-lg text-sm"
              onChange={filterUserByName}
            />
            <span className="absolute text-[#A7A3FF] right-3 top-5">
              <IoIosSearch />
            </span>
          </div>
        </div>
        </div>
      </div>
      <div className="overflow-x-auto my-5 rounded-lg">
        <table className="table bg-white">
          <thead>
            <tr className="bg-primary text-white">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Membership</th>
              <th>Role</th>
              <th>Balance</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
                <tr key={user.id} className="text-medium hover:bg-indigo-100">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{getMembershipName(user.membership)}</td>
                  <td>{user.role}</td>
                  <td>{formatRupiah(user.balance)}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="bg-red-600 p-2 rounded"
                      onClick={() => openModal(user)}
                    >
                      <MdDelete color="white" size="20" />
                    </button>
                  </td>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="flex justify-between">
                      <h1 className="text-primary font-semibold text-[20px]">
                        Confirm Delete User
                      </h1>
                      <span className="cursor-pointer" onClick={closeModal}>
                        &times;
                      </span>
                    </div>
                    <p className="py-10">
                      Are you sure want to delete{" "}
                      <span className="text-primary">{selectedUser?.name}</span>{" "}
                      ?
                    </p>
                    <div className="flex gap-3 font-semibold justify-center">
                      <Button
                        styles="btn-primary bg-primary rounded-md text-white w-1/3 py-2"
                        value="Yes"
                        funcOnClick={handleDeleteUser}
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

export default UserListPage;
