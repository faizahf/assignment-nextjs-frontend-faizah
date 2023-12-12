import { useState } from "react";
import { removeAuthToken } from "../../utils/cookie";
import Link from 'next/link'

export const Sidebar = () => {

    const handleLogout = () => {
        removeAuthToken('token');
        removeAuthToken('role');
    }
  return (
    <>
      <div className="flex flex-col w-[300px] h-screen bg-primary items-center justify-center text-center relative py-10 px-7 shadow-2xl">
        <div>
          <h2 className="text-[32px] font-semibold border-b border-primary">
            SkillUp Admin
          </h2>
        </div>
        <div className="w-full py-5 flex flex-col flex-grow gap-5 justify-between">
          <ul className="font-semibold">
            <li className={`my-5 cursor-pointer`}>
              <Link href="/admin">DASHBOARD</Link>
            </li>
            <li className={`my-5 cursor-pointer`}>
              <Link href="#">EVENTS</Link>
            </li>
            <li className={`my-5 cursor-pointer`}>
              <Link href="#">USERS</Link>
            </li>
                <Link className={`my-5 cursor-pointer`} onClick={handleLogout} href="/auth/login">
                    LOGOUT
                </Link>
            <li>

            </li>
          </ul>

        </div>
      </div>
    </>
  );
};
