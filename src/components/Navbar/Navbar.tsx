import { removeUser } from '@/stores/slices/user/userSlice';
import { removeAuthToken } from '@/utils/cookie';
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux';

function Navbar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        removeAuthToken('token');
        removeAuthToken('role');
        dispatch(removeUser());
    }
    
  return (
    <nav className='px-60 py-5 bg-navy-blue'>
        <div className='flex justify-between items-center'>
            <h1 className="text-primary text-[40px] font-bold">SkillUp</h1>
        <div>
            <ul className='flex text-[16px] gap-10 text-white'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/bookmarks">Bookmarks</Link></li>
                <li><Link href="/purchase-history">Purchase History</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </div>
        </div>
    </nav>
  )
}

export default Navbar