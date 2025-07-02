import React from 'react'
import SideBar from './Components/SideBar'
import { getSession, useSession } from 'next-auth/react'

const page = async() => {
    const session = await getSession()
    console.log(session?.user)
  return (
    <div>
      <SideBar session={session!}/>
    </div>
  )
}

export default page
