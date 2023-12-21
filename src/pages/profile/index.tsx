import Modal from "@/components/Modal/Modal";
import useFetch from "@/hooks/useFetch";
import { updateBalance } from "@/stores/slices/user/userSlice";
import { RootState } from "@/stores/store";
import { TopupForm, User } from "@/types";
import { formatRupiah, getMembershipName } from "@/utils";
import { topupOptions } from "@/validations/topup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchData: updateUser } = useFetch<User>();
  const {register, handleSubmit, formState: { errors }, reset} = useForm<TopupForm>();

  const handleTopUp = (data: any) => {
    updateUser(`users/${loggedUser?.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            balance: (Number(loggedUser?.balance )+ Number(data.amount))
        })
    })

    dispatch(updateBalance((Number(loggedUser?.balance )+ Number(data.amount))));
    setIsModalOpen(!isModalOpen);

    toast.success("Top up SkillUpPay success!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "light",
        hideProgressBar: true,
    });

    reset();
  }

  const handleError = (errors: any) => {};

  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="text-[36px] text-dark font-semibold text-center">
          Profile
        </h1>
        <div className="flex gap-5 p-5 w-full">
          <div className="bg-white h-full w-full my-10 p-10 rounded-3xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              <img
                src={`${
                  loggedUser?.image === ""
                    ? "/img/unknown-image-user.png"
                    : loggedUser?.image
                }`}
                className="rounded-full w-48 mx-auto my-5 bg-secondary shadow-lg"
              />
              <div>
                <span className="flex gap-3 items-center">
                  <p className="font-semibold text-xl capitalize">
                    {loggedUser?.name}
                  </p>
                  <span
                    className={`rounded-full text-sm text-white px-5 ${
                      loggedUser?.membership === 1 &&
                      "bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-400"
                    } 
                                ${
                                  loggedUser?.membership === 2 &&
                                  "bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600"
                                }
                                ${
                                  loggedUser?.membership === 3 &&
                                  "bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600"
                                }`}
                  >
                    {getMembershipName(Number(loggedUser?.membership))}
                  </span>
                </span>
                <p className="text-sm">{loggedUser?.email}</p>
                <div></div>
                <button className="btn btn-primary bg-primary my-2">
                  Edit Profile
                </button>
              </div>
              <div>
                <p>SkillUpPay Balance:</p>
                <p className="font-bold">
                  {formatRupiah(Number(loggedUser?.balance))}
                </p>
                <button
                  className="btn btn-neutral h-3 my-2 bg-dark"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Top Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="flex justify-between">
            <h1 className="text-primary font-semibold text-[20px]">
              Top Up SkillUpPay
            </h1>
            <span
              className="cursor-pointer"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit(handleTopUp, handleError)}>
            <div className="my-5">
                <label htmlFor="source">
                    Source of Funds
                </label>
                <select
                    className="form-select px-4 py-2.5 rounded w-full rounded-lg"
                    {...register("source", topupOptions.source)}
                    >
                    <option value="1">Bank Transfer</option>
                    <option value="2">Credit Card</option>
                    <option value="3">Cash</option>
                    <option value="4">Reward</option>
                </select>
                <small className="text-red-700">
                    {errors?.source && errors.source.message}
                </small>
            </div>
            <div className="my-5">
                <label htmlFor="amount">
                Amount
                </label>
                <input
                type="number"
                placeholder="Enter amount here"
                className="block form-input border rounded w-full p-2.5"
                {...register("amount", topupOptions.amount)}
                />
                <small className="text-red-700">
                {errors?.amount && errors.amount.message}
                </small>
            </div>
          <button className="btn btn-primary bg-primary">Top Up</button>
        </form>
        </Modal>
      </div>
    </>
  );
}

export default ProfilePage;
