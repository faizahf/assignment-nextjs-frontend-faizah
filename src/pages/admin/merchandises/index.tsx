import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { Merchandise } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

function MerchandiseListPage() {
  const router = useRouter();
  const [nameSearch, setNameSearch] = useState("");
  const { data: emerchList, fetchData: fetchMerchList } = useFetch<Merchandise[]>();

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

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Merchandises</h1>
        <div className="flex gap-3">
          <Button
            styles={"btn-primary bg-primary"}
            value={"Add New Merchandise"}
            funcOnClick={() => router.push("merchandises/add-merchandise")}
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
            </tr>
          </thead>
          <tbody>
            {emerchList &&
              emerchList.map((merch) => (
                <tr key={merch.id} className="text-medium hover:bg-indigo-100">
                  <td>{merch.id}</td>
                  <td>{merch.name}</td>
                  <td>{merch.event?.name}</td>
                  <td>{merch.price}</td>
                  <td>{merch.stock}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MerchandiseListPage;
