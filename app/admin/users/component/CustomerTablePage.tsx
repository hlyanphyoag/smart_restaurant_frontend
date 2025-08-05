'use client'
import { DataTable } from '@/app/cashier/Components/data-table'
import { useQueryUser } from '@/services/UserServices/user.query'
import React from 'react'
import { columns } from './column'
import { useTableStore } from '@/store/TableStore'
import Lottie from 'lottie-react'

const CustomerTablePage = () => {
  const {pageIndex, pageSize } = useTableStore()
  const {data: cutomerData, isPending, isError} = useQueryUser( (pageIndex + 1).toString(), pageSize.toString(), 'CUSTOMER')
  console.log("Cdata:", cutomerData)
  if (isPending) return <div className="flex items-center justify-center">
  <div className="h-60 w-60">
  <Lottie
    animationData={require("@/public/loading.json")}
    loop={true}
    autoPlay={true}
    size={100}
  />
  </div>
  </div>
  if(isError) return <div>Error</div>
  return (
    <DataTable 
      data={cutomerData?.results} 
      columns={columns} 
      totalPages={cutomerData?.totalPages} 
      totalElements={cutomerData?.totalElements} />
  )
}

export default CustomerTablePage
