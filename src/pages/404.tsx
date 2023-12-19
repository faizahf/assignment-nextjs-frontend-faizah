import Button from '@/components/Button/Button'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

function NotFoundPage() {
    const router = useRouter();
  return (
    <div className='m-auto text-center'>
        <Image src={'/img/not-found.png'} alt={'not-found'} width={600} height={600}/>
        <p className='font-bold text-[36px] mt-10'>Oops!</p>
        <p className='text-grey text-2xl'>We can’t seem to find the page you are looking for</p>
        <Button styles={'btn-primary bg-primary rounded-full mt-10'} value={'Back to Homepage'} funcOnClick={() => router.push('/')} />
    </div>
  )
}

export default NotFoundPage