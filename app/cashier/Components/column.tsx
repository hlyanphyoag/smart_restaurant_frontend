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
            <div key={index} className="ml-1 text-xs">
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
          <Badge
            variant="secondary"
            className={`${methodColor.bg} ${methodColor.text}`}
          >
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

      let badgeColor = "bg-gray-100 text-gray-500";
      let label = "Unknown";

      if (status === "PENDING") {
        badgeColor = "bg-orange-100 text-orange-500";
        label = "Pending";
      } else if (status === "READY") {
        badgeColor = "bg-green-100 text-green-500";
        label = "Ready";
      } else if (status === "COMPLETED") {
        badgeColor = "bg-green-100 text-green-500";
        label = "Completed";
      } else {
        badgeColor = "bg-yellow-100 text-yellow-500";
        label = "In Progress";
      }

      return (
        <Badge variant="secondary" className={badgeColor}>
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const router = useRouter();
      const { mutate: confirmOrder } = useOrderConfirmMutation();
      const { mutate: completeOrder } = useOrderCompleteMutation();
      const { mutate: tableMutation } = useTableMutation();
      const { mutate: paymentStatusMutation } = usePaymentStatusMutation();
      const queryClient = useQueryClient();

      const handleConfirmOrder = () => {
        confirmOrder(
          { id: row.original.id },
          {
            onSuccess: () => {
              paymentStatusMutation({
                id: row.original.id,
                paymentStatus: "true",
              });
              queryClient.invalidateQueries({ queryKey: ["order"] });

              if (row.original.table) {
                tableMutation(
                  {
                    tableId: row.original.table.id,
                    occupied: !row.original.table?.occupied,
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["getAllTable"],
                      });
                      toast.success("Table Updated Successfully");
                    },
                  }
                );
              }
            },
          }
        );
      };

      const handleCompleteOrder = () => {
        completeOrder(
          { id: row.original.id },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["order"] });
            },
          }
        );
      };

      const status = row.original.status;

      let buttonLabel = "";
      if (status === "PENDING") buttonLabel = "Confirm";
      else if (status === "READY") buttonLabel = "To Complete";
      else if (
        status === "WAITING_FOR_INGREDIENTS" ||
        status === "INGREDIENTS_APPROVED" ||
        status === "CONFIRMED"
      )
        buttonLabel = "In Progress";
      else if (status === "COMPLETED") buttonLabel = "Success";

      const disabled =
        status === "WAITING_FOR_INGREDIENTS" ||
        status === "INGREDIENTS_APPROVED" ||
        status === "COMPLETED" ||
        status === "CONFIRMED";

      const onClickAction =
        status === "PENDING"
          ? handleConfirmOrder
          : status === "READY"
          ? handleCompleteOrder
          : undefined;

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
            onClick={onClickAction}
            disabled={disabled}
            variant={
              status === "PENDING"
                ? "request_ingredients"
                : status === "READY"
                ? "ready_order"
                : status === "COMPLETED"
                ? "done"
                : "secondary"
            }
            size="sm"
            className="text-xs"
          >
            {buttonLabel}
          </Button>
        </div>
      );
    },
  },
];
