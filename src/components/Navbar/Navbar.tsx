import { removeUser } from '@/stores/slices/user/userSlice';
import { removeAuthToken } from '@/utils/cookie';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

function Navbar() {
    const dispatch = useDispatch();
    const [nav, setNav] = useState(false);

    const handleLogout = () => {
        removeAuthToken('token');
        removeAuthToken('role');
        dispatch(removeUser());
    }
    
  return (
    <>
    <nav className='px-20 md:px-48 py-5 bg-navy-blue'>
        <div className='flex gap-10 justify-between items-center text-center'>
            <h1 className="text-primary text-[40px] font-bold">SkillUp</h1>
            <div>
                <ul className='hidden lg:flex text-[16px] gap-10 text-white items-center text-center'>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/bookmarks">Bookmarks</Link></li>
                    <li><Link href="/purchase-history">Purchase History</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><Link href="/" onClick={handleLogout}>Logout</Link></li>
                </ul>

                <div onClick={() => setNav(!nav)} className="cursor-pointer text-white lg:hidden">
                    <FaBars size={30} />
                </div>

                {nav && (
                    <div className="px-20 md:px-48 py-5 z-10 absolute top-0 left-0 w-full bg-navy-blue shadow-lg">
                        <div className='flex gap-10 justify-between items-center text-center'>
                            <h1 className="text-primary text-[40px] font-bold">SkillUp</h1>
                            <div onClick={() => setNav(!nav)} className="cursor-pointer text-white lg:hidden">
                                <FaTimes size={30} />
                            </div>
                        </div>
                        <ul className='flex flex-col justify-center items-center text-white py-16'>
                            <li className="px-4 cursor-pointer capitalize py-6 text-2xl">
                                <Link onClick={() => setNav(!nav)} href="/">Home</Link>
                            </li>
                            <li className="px-4 cursor-pointer capitalize py-6 text-2xl">
                                <Link onClick={() => setNav(!nav)} href="/bookmarks">Bookmarks</Link>
                            </li>
                            <li className="px-4 cursor-pointer capitalize py-6 text-2xl">
                                <Link onClick={() => setNav(!nav)} href="/purchase-history">Purchase History</Link>
                            </li>
                            <li className="px-4 cursor-pointer capitalize py-6 text-2xl">
                                <Link onClick={() => setNav(!nav)} href="/profile">Profile</Link>
                            </li>
                            <li className="px-4 cursor-pointer capitalize py-6 text-2xl">
                                <Link onClick={handleLogout} href="/">Logout</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar