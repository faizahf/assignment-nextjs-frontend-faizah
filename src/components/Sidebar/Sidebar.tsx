import { useState } from "react";
import { removeAuthToken } from "../../utils/cookie";
import Link from "next/link";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeUser } from "@/stores/slices/user/userSlice";

export const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeAuthToken("token");
    removeAuthToken("role");
    dispatch(removeUser());
  };

  return (
    <>
      <div
        className={`text-primary ${
          openSidebar ? "w-80" : "w-20"
        }
        bg-white min-h-screen p-5 pt-8 relative duration-300`}
      >
        <IoIosArrowBack
          className={`absolute cursor-pointer -right-5 top-7 w-10 h-10 bg-primary text-white
              border-2 rounded-full p-1  ${!openSidebar && "rotate-180"}`}
          onClick={() => setOpenSidebar(!openSidebar)}
        />
        <div className={`flex gap-x-4 items-center text-2xl`}>
          <MdAdminPanelSettings
            className={`cursor-pointer duration-500 ${
              openSidebar && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`origin-left font-semibold duration-200 ${
              !openSidebar && "scale-0 hidden"
            }`}
          >
            SkillUp Admin
          </h1>
        </div>
        <ul className="pt-6 font-medium">
          <li
            className={`rounded-md p-2 cursor-pointer hover:bg-indigo-500 hover:text-white text-black text-md`}
          >
            <Link href={"/admin"} className="flex gap-x-4 items-center">
              <MdDashboard />
              <span
                className={`${
                  !openSidebar && "hidden"
                } origin-left duration-200`}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li
            className={`rounded-md p-2 cursor-pointer hover:bg-indigo-500 hover:text-white text-black text-md
              `}
          >
            <Link href={"/admin/events"} className="flex gap-x-4 items-center">
              <BsFillCalendarEventFill />
              <span
                className={`${
                  !openSidebar && "hidden"
                } origin-left duration-200`}
              >
                Events
              </span>
            </Link>
          </li>
          <li
            className={`rounded-md p-2 cursor-pointer hover:bg-indigo-500 hover:text-white text-black text-md
              `}
          >
            <Link href={"/admin/merchandises"} className="flex gap-x-4 items-center">
              <MdInventory />
              <span
                className={`${
                  !openSidebar && "hidden"
                } origin-left duration-200`}
              >
                Merchandises
              </span>
            </Link>
          </li>
          <li
            className={`  rounded-md p-2 cursor-pointer hover:bg-indigo-500 hover:text-white text-black text-md 
              `}
          >
            <Link href={"/admin/users"} className="flex gap-x-4 items-center">
              <FaUserGroup />
              <span
                className={`${
                  !openSidebar && "hidden"
                } origin-left duration-200`}
              >
                Users
              </span>
            </Link>
          </li>
          <li
            className={`rounded-md p-2 cursor-pointer hover:bg-indigo-500 hover:text-white text-black text-md
              `}
          >
            <Link href={"/"} className="flex gap-x-4 items-center" onClick={handleLogout}>
              <TbLogout />
              <span
                className={`${!openSidebar && "hidden"} origin-left duration-200`}
              >
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
