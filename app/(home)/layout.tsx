import { Header } from '@/components/Header'
import React from 'react'
import { getServerSession } from 'next-auth'
import { User } from '@/types/user';

const layout = async ({children}: {children: React.ReactNode}) => {
    const session = await getServerSession();
    console.log(session)
  return (
   <div className='flex flex-col items-center'>
      <Header user={session?.user as User}/>
      {children}
   </div>
  )
}

export default layout
