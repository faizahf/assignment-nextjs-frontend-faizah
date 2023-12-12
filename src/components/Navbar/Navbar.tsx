import { removeAuthToken } from '@/utils/cookie';
import Link from 'next/link'
import React from 'react'

function Navbar() {
    const handleLogout = () => {
        removeAuthToken('token');
        removeAuthToken('role');
    }
    
  return (
    <nav className='px-60 py-10'>
        <div className='flex justify-between items-center'>
            <h1 className="text-primary text-[40px] font-semibold">SkillUp</h1>
        <div>
            <ul className='flex text-[20px] gap-10'>
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