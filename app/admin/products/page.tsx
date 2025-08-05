'use client'
import React from 'react'
import ProductTable from './Components/ProductTable'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  return (
   <div>
     <Button variant='customize' onClick={() => router.push('/admin/products/add')}>+ Add New Product</Button>
     <ProductTable />
   </div>
  )
}

export default page
