import Button from "@/components/Button/Button";
import useFetch from "@/hooks/useFetch";
import { RootState } from "@/stores/store";
import { Purchase } from "@/types";
import { formatDate, formatRupiah, getDiscountByMembership } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import { useSelector } from "react-redux";

function PurchaseHistoryPage() {
  const router = useRouter();
  const { data: purchases, fetchData: fetchPurchases } = useFetch<Purchase[]>();
  const loggedUser = useSelector((state: RootState) => state.user.data);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let totalPages = 1;
  let currentPurchases: Purchase[] = [];
  if (purchases) {
    currentPurchases = purchases.slice(startIndex, endIndex);
    totalPages = Math.ceil(purchases.length / itemsPerPage);
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    fetchPurchases("purchases?_sort=purchaseDate&_order=desc&_expand=event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handlePageChange = (newPage: number) => {
    if (purchases) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h1 className="text-[36px] text-dark font-semibold text-center">
        Purchase History
      </h1>
      {currentPurchases?.map((purchase) => (
          <div
            className="border my-5 rounded-xl shadow-md border-secondary bg-white p-5"
            key={purchase.id}
          >
            <div className="text-center flex justify-between mb-2">
              <div>
                <p>{formatDate(purchase.purchaseDate)}</p>
              </div>
              {purchase.isPaid ? (
                <div className="rounded-lg bg-primary px-5 py-1 text-white">Paid</div>
              ) : (
                <div className="rounded-lg bg-grey px-5 py-1 text-white">
                  Unpaid
                </div>
              )}
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-8 py-2 border-t">
              <img
                src={`${purchase.event?.image}`}
                alt={`${purchase.event?.name}`}
                className="w-40 h-28 object-cover"
              />
              <div className="py-8 w-full">
                <p className="card-title capitalize">{purchase.event?.name}</p>
                <div className="flex justify-between">
                  <p>x1</p>
                  <p>{formatRupiah(Number(purchase.event?.price))}</p>
                </div>
              </div>
            </div>

            {purchase.merchandises.length !== 0 &&
              purchase.merchandises.map((data) => (
                <div
                  className="flex flex-col lg:flex-row w-full gap-8 border-t py-2"
                  key={data.merch.id}
                >
                  <img
                    src={`${data.merch.image}`}
                    alt={`${data.merch.name}`}
                    className="w-40 h-28 object-cover"
                  />
                  <div className="py-8 w-full">
                    <p className="card-title capitalize">{data.merch.name}</p>
                    <div className="flex justify-between">
                      <p>x{data.merch.qty}</p>
                      <p>{formatRupiah(data.merch.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
              
            <div className="flex gap-3 justify-end items-center border-t py-2">
              <p className="flex gap-2 items-center">
                <MdOutlinePayments color="#7848F4" />
                Total Payment:{" "}
              </p>
              <p className="text-primary text-2xl">
                {formatRupiah(purchase.paymentTotal)}
              </p>
              {purchase.isPaid === false && 
                <Button styles={"btn btn-primary bg-primary"} value={"Continue Payment"} funcOnClick={() => router.push(`purchase-history/${purchase.id}/payment`)}/>
              }
            </div>
          </div>
        ))}
        
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
    </div>
    
  );
}

export default PurchaseHistoryPage;
