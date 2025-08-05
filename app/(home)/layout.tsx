'use client'
import { Header } from '@/components/Header'
import React from 'react'
import { getServerSession } from 'next-auth'
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';

const layout = ({children}: {children: React.ReactNode}) => {
    const session = useSession();
    console.log('Session:', session)
  return (
   <div className='flex flex-col items-center'>
      <Header user={session?.data?.user as User}/>
      {children}
   </div>
  )
}

export default layout
