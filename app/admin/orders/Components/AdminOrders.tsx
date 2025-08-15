'use client'
import React from 'react'

import { columns } from '@/app/cashier/Components/column'
import { useGetAllOrderQuery } from '@/services/OrderServices/order.query'
import { useStatusStore } from '@/store/StatusStore'
import { useTableStore } from '@/store/TableStore'
import { DataTable } from '@/app/cashier/Components/data-table'
import Lottie from 'lottie-react'

const AdminOrders = () => {
    const {pageIndex, pageSize} = useTableStore()
    const {status} = useStatusStore()
    const {data: OrderData, isPending, isError } = useGetAllOrderQuery("COMPLETED", pageSize.toString(), (pageIndex + 1).toString())

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
    <div>
      <DataTable columns={columns} data={OrderData?.results} totalPages={OrderData?.totalPages} totalElements={OrderData?.totalElements}/>
    </div>
  )
}

export default AdminOrders
