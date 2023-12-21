import { Sidebar } from "@/components/Sidebar/Sidebar";
import useFetch from "@/hooks/useFetch";
import { Purchase } from "@/types";
import { formatRupiah } from "@/utils";
import React, { useEffect } from "react";

function AdminHomePage() {
  const { data: purchases, fetchData: fetchPurchases } = useFetch<Purchase[]>();

  useEffect(() => {
    fetchPurchases("purchases", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [])

  const getIncome = (): number => {
    let income = 0;
    if (purchases) {
      for (const purchase of purchases) {
        income += purchase.paymentTotal;
      }
    }

    return income;
  }

  return (
    <>
      <div className="flex flex-col gap-10 justify-between items-center">
        <h1 className="text-2xl font-semibold w-full">Dashboard</h1>
        <div className="bg-primary text-white rounded-lg px-10 py-5 self-start">
          <h2 className="font-semibold text-2xl mb-2">Income</h2>
          <h2 className="font-medium">{formatRupiah(getIncome())}</h2>
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
