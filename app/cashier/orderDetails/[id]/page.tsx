'use client'
import React from 'react'
import { ViewOrderDetailsModal } from '../../Components/ViewOrderDetailsCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { redirect, useParams, useRouter } from 'next/navigation'

const page = () => {
   const router = useRouter()
    const {id} = useParams()
  return (
    <div className="flex flex-col justify-center items-center mb-10">
        <div className="flex justify-center items-center gap-x-2 mb-6">
        <Button variant='ghost' onClick={() => router.back()} className='p-2 h-10 w-10 border border-gray-200 rounded-full bg-blue-500 text-white hover:bg-blue-400 hover:text-white'>
          <ArrowLeft />
        </Button>
        <h1 className="text-3xl font-bold">Here's Order Details Page!</h1>
        </div>
        <ViewOrderDetailsModal id={id as string} />
    </div>
  )
}

export default page
