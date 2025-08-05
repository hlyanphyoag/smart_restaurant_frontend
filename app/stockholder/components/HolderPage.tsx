'use client'
import { DataTable } from '@/app/cashier/Components/data-table'
import StatusCard from '@/app/cashier/Components/StatusCard'
import { Loading } from '@/components/Loading'
import { useGetStockRequestQuery } from '@/services/StockServices/stock.query'
import { useStatusStore } from '@/store/StatusStore'
import { useTableStore } from '@/store/TableStore'
import React from 'react'
import { columns } from './columns'
import HolderStatusCard from './HolderStatusCard'

const HolderPage = () => {
  const {status} = useStatusStore();
  const {pageSize, pageIndex} = useTableStore()
  const {data: stockRequests, isPending, isError } = useGetStockRequestQuery(status, pageSize.toString(), (pageIndex + 1).toString())

  if(isPending) return <Loading />
  if(isError) return <div>Error</div>
  console.log("stockRequests:", stockRequests)
  return (
    <div className='flex flex-col gap-6 justify-center items-center mb-10'>
      <HolderStatusCard />
      <DataTable 
        columns={columns} 
        data={stockRequests?.results} 
        totalPages={stockRequests?.totalPages} 
        totalElements={stockRequests?.totalElements}/>
    </div>
  )
}

export default HolderPage
