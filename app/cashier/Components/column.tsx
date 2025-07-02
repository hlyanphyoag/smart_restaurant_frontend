"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Armchair,  Check,  MoveRight,  ShoppingBag } from "lucide-react"
import {formatDistanceToNow} from "date-fns"


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: (({row} : any) => {
        const orderId = row.original.id
        return (
          <div className="text-sm text-blue-500">
            #{orderId}
          </div>
        )
    })
  },
  {
    accessorFn: (row: any) => row.customer.name.toLowerCase().replace(/\s+/g, "") ?? "",
    id: 'customer',
    header: "Customer",
    cell: (({row} : any) => {
        const customer = row.original.customer
        return (
            <div className="flex gap-x-2">
                {customer.profilePic ? (
                  <img src={customer.profilePic} alt={customer.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-400 text-white font-semibold flex items-center justify-center">{customer.name[0]}</div>
                )}
                <div className="flex justify-center items-center">
                    <p className="text-gray-600 text-sm font-semibold">{customer.name}</p>
                </div>
            </div>
        )
    })
  },
  {
    accessorFn: (row: any) => row.table.number ? `Table ${row.table.number}`.toLowerCase().replace(/\s+/g, "") : `Take Away`,
    id: "tableNo",
    header: "Type",
    cell: (({row} : any) => {
      const table = row.original.table
      return (
        <div>{table ? (
          <Badge variant="secondary" className="bg-blue-300 text-white">
            <Armchair size={20}/>
            <p className="text-xs font-semibold">Table {table.number}</p>
          </Badge>
        ) : (<Badge variant="outline">
          <ShoppingBag />
          <p className="text-gray-600 text-xs font-semibold">Take Away</p>
        </Badge>)}
      </div>
      )
    })
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: (({row} : any) => {
      const items = row.original.items
      return (
        <div>Items</div>
      )
    })
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: (({row} : any) => {
      const total = row.original.total
      return (
        <div>$315</div>
      )
    })
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (({row} : any) => {
      const status = row.original.status
      return (
        <div >
          {status === "PENDING" ? (
            <Badge variant="outline" className="bg-orange-100 text-orange-500">Pending</Badge>
          ) : status === "CONFIRMED" ? (
            <Badge variant="secondary" className="bg-red-100 text-red-500">Progress</Badge>
          ) : (
            <Badge variant="secondary">Completed</Badge>
          )}
        </div>
      )
    })
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: (({row} : any) => {
      const createdAt = row.original.createdAt
      return (
        <div className="text-xs font-semibold">{formatDistanceToNow(new Date(createdAt))} ago</div>
      ) 
    })
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (({row} : any) => {
      const actions = row.original.actions
      return (
        <div className="flex gap-x-2">
          <Button variant="secondary" size='sm' className="text-xs">View</Button>
          <Button disabled={row.original.status !== "PENDING"} variant="customize" size='sm' className="text-xs">{row.original.status === "PENDING" ? "Confirm" : "Paid"}</Button>
        </div>
      )
    })
  }
]