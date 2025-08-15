"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Armchair, Check, MoveRight, ShoppingBag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import {
  useOrderCompleteMutation,
  useOrderConfirmMutation,
} from "@/services/OrderServices/order.queryMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useTableMutation } from "@/services/TableServices/table.mutation";
import { toast } from "sonner";
import { usePaymentStatusMutation } from "@/services/StripeServices/bill.mutation";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }: any) => {
      const orderId = row.original.id;
      return <div className="text-sm text-blue-500">#{orderId}</div>;
    },
  },
  {
    accessorFn: (row: any) =>
      row.customer.name.toLowerCase().replace(/\s+/g, "") ?? "",
    id: "customer",
    header: "Customer",
    cell: ({ row }: any) => {
      const customer = row.original.customer;
      return (
        <div className="flex gap-x-2">
          {customer.profilePic ? (
            <img
              src={customer.profilePic}
              alt={customer.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-400 text-white font-semibold flex items-center justify-center">
              {customer.name[0]}
            </div>
          )}
          <div className="flex flex-col justify-start items-start">
            <p className="text-gray-600 text-sm font-semibold">
              {customer.name}
            </p>
            <small>{customer.email}</small>
          </div>
        </div>
      );
    },
  },
  {
    accessorFn: (row: any) =>
      row.table.number
        ? `Table ${row.table.number}`.toLowerCase().replace(/\s+/g, "")
        : `Take Away`,
    id: "tableNo",
    header: "Type",
    cell: ({ row }: any) => {
      const table = row.original.table;
      return (
        <div>
          {table ? (
            <Badge variant="secondary" className="bg-blue-300 text-white">
              <Armchair size={20} />
              <p className="text-xs font-semibold">Table {table.number}</p>
            </Badge>
          ) : (
            <Badge variant="outline">
              <ShoppingBag />
              <p className="text-gray-600 text-xs font-semibold">Take Away</p>
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }: any) => {
      const items = row.original.items;
      return (
        <div className="flex flex-wrap">
          {items.map((item: any, index: number) => (
            <div key={index} className="ml-1 text-xs ">
              {item.foodItem.name}
              {index < items.length - 1 ? ", " : ""}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalCost",
    header: "Total",
    cell: ({ row }: any) => {
      const total = row.original.totalCost;
      return <div className="text-xs font-semibold">${total.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }: any) => {
      const { paymentMethod, paid } = row?.original?.bill ?? {};
  
      const methodColor =
        paymentMethod === "CASH"
          ? { bg: "bg-green-100", text: "text-green-500" }
          : { bg: "bg-blue-100", text: "text-blue-500" };
  
      const paidColor = paid
        ? { bg: "bg-green-100", text: "text-green-500", label: "Paid" }
        : { bg: "bg-blue-100", text: "text-blue-500", label: "Not Paid" };
  
      return (
        <div className="flex gap-x-1">
          <Badge variant="secondary" className={`${methodColor.bg} ${methodColor.text}`}>
            {paymentMethod}
          </Badge>
          <Badge className={`${paidColor.bg} ${paidColor.text}`}>
            {paidColor.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }: any) => {
      const createdAt = row.original.createdAt;
      return (
        <div className="text-xs font-semibold">
          {formatDistanceToNow(new Date(createdAt))} ago
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.original.status;
      return (
        <div>
          {status === "PENDING" ? (
            <Badge variant="outline" className="bg-orange-100 text-orange-500">
              Pending
            </Badge>
          ) : status === "COMPLETED" ? (
            <Badge variant="secondary" className="bg-green-100 text-green-500">
              Completed
            </Badge>
          ) : status === "READY" ? (
            <Badge variant="secondary" className="bg-green-100 text-green-500">
              Ready
            </Badge>
          ) :
           (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-500"
            >
              Progress
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const router = useRouter();
      const actions = row.original.actions;
      const { mutate: confirmOrder } = useOrderConfirmMutation();
      const { mutate: completeOrder } = useOrderCompleteMutation();
      const { mutate: tableMutation } = useTableMutation();
      const { mutate: paymentStatusMutation } = usePaymentStatusMutation();
      const queryClient = useQueryClient();
      console.log("Table:", row.original?.table);

      const handleConfirmOrder = () => {
        confirmOrder(
          { id: row.original.id },
          {
            onSuccess: (data) => {
              console.log("ConfirmOrderSuccess:", data);
              paymentStatusMutation({id: row.original.id, paymentStatus: "true"}, {
                onSuccess: (data) => {
                  console.log("PaymentStatusSuccess:", data);
                },
                onError: (err) => {
                  console.log("PaymentStatusError:", err);
                }
              })
              queryClient.invalidateQueries({
                queryKey: ["order"],
              });
              tableMutation(
                {
                  tableId: row.original.table.id,
                  occupied: !row.original.table.occupied,
                },
                {
                  onSuccess: (data) => {
                    console.log("TableMutationSuccess", data);
                    queryClient.invalidateQueries({
                      queryKey: ["getAllTable"],
                    });
                    toast.success("Table Updated Successfully");
                  },
                  onError: (error) => {
                    console.log("Error: ", error);
                  },
                }
              );
            },
            onError: (error) => {
              console.log("ConfirmOrderError:", error);
            },
          }
        );
      };

      const handleCompleteOrder = () => {
        completeOrder(
          { id: row.original.id },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries({
                queryKey: ["order"],
              });
            },
            onError: (error) => {
              console.log("CompleteOrderError:", error);
            },
          }
        );
      };

      console.log("Status:", row.original.table);

      const toComplete =
        row.original.status === "COMPLETED" && row.original.table.occupied;

      return (
        <div className="flex gap-x-2">
          <Button
            onClick={() =>
              router.push(`/cashier/orderDetails/${row.original.id}`)
            }
            variant="secondary"
            size="sm"
            className="text-xs"
          >
            View
          </Button>
          <Button
            onClick={
              row.original.status === "PENDING"
                ? handleConfirmOrder
                : handleCompleteOrder
            }
            disabled={
              !(
                row.original.status === "PENDING" || row.original.status === "READY" ||
                (row.original.status === "COMPLETED" &&
                  row.original.table.occupied === true)
              )
            }
            variant={
              row.original.status === "PENDING"
                ? "request_ingredients"
                : row.original.status === "CONFIRMED"
                ? "ready_order"
                : "done"
            }
            size="sm"
            className="text-xs"
          >
            {row.original.status === "PENDING"
              ? "Confirm": 
              row.original.status === "COMPLETED" && row.original.table.occupied === false
              ? "Success"
              : row.original.status === "COMPLETED"
              ? "Complete"
              : toComplete || row.original.status === "READY" ? "to Complete"
              : "Progress"}
          </Button>
        </div>
      );
    },
  },
];
