import { removeUser } from '@/stores/slices/user/userSlice';
import { RootState } from '@/stores/store';
import { removeAuthToken } from '@/utils/cookie';
import Head from 'next/head';
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FcMindMap } from "react-icons/fc";
import { useRouter } from 'next/router';
import { formatRupiah } from '@/utils';
import Script from 'next/script';

function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const loggedUser = useSelector((state: RootState) => state.user.data);

    const handleLogout = () => {
        removeAuthToken('token');
        removeAuthToken('role');
        dispatch(removeUser());
    }
    
  return (
    <>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.1/dist/flowbite.min.css" />
        </Head>   
        <nav className="bg-dark border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse text-primary">
                    <FcMindMap size="24" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">SkillUp</span>
                </a>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex text-sm bg-secondary rounded-full md:me-0 focus:ring-1 focus:ring-secondary" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <img className="w-8 h-8 rounded-full" src={`${loggedUser?.image === "" ? "/img/unknown-image-user.png" : loggedUser?.image}`} alt="user photo" />
                    </button>

                    <div className="z-50 hidden my-4 text-base list-none bg-dark divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-white capitalize">{loggedUser?.name}</span>
                            <span className="block text-sm  text-white truncate">Balance: {formatRupiah(Number(loggedUser?.balance))}</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <Link href="/top-up" className={`block px-4 py-2 text-sm text-white hover:bg-primary ${router.asPath === "/top-up" ? 'bg-primary' : 'bg-transparent'}`}>Top Up Balance</Link>
                            </li>
                            <li>
                                <Link href="/profile" className={`block px-4 py-2 text-sm text-white hover:bg-primary ${router.asPath === "/profile" ? 'bg-primary' : 'bg-transparent'}`}>Profile</Link>
                            </li>
                            <li>
                                <Link href="/" onClick={handleLogout} className="block px-4 py-2 text-sm text-white hover:bg-primary">Logout</Link>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-dark focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-user" aria-expanded="false">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link href="/" className={`block py-2 px-3 text-white rounded-lg hover:bg-primary p-2 ${router.asPath === "/" ? 'bg-primary' : 'bg-transparent'}`}>Home</Link>
                        </li>
                        <li>
                            <Link href="/bookmarks" className={`block py-2 px-3 text-white rounded-lg hover:bg-primary p-2 ${router.asPath === "/bookmarks" ? 'bg-primary' : 'bg-transparent'}`}>Bookmarks</Link>
                        </li>
                        <li>
                            <Link href="/purchase-history" className={`block py-2 px-3 text-white rounded-lg hover:bg-primary p-2 ${router.asPath === "/purchase-history" ? 'bg-primary' : 'bg-transparent'}`}>Purchase History</Link>
                        </li>
                        <li>
                            <Link href="/membership" className={`block py-2 px-3 text-white rounded-lg hover:bg-primary p-2 ${router.asPath === "/membership" ? 'bg-primary' : 'bg-transparent'}`}>Membership</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <Script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js" />
    </>
  )
}

export default Navbar