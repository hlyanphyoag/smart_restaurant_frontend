'use client'
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-sm font-semibold text-gray-700">Customer ID</div>,
    cell: ({ row }) => (
      <div className="text-sm text-gray-800">{row.original.id}</div>
    ),
  },
  {
    accessorFn: (row: any) => row.name?.toLowerCase().replace(/\s+/g, ""),
    id: 'customer',
    header: () => <div className="text-sm font-semibold text-gray-700">Customer</div>,
    cell: ({ row }: any) => {
      const customer = row.original;
      return (
        <div className="flex items-center gap-3">
          {customer.profilePic ? (
            <img
              src={customer.profilePic}
              alt={customer.name}
              width={40}
              height={40}
              className="rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg uppercase">
              {customer.name?.[0] ?? "?"}
            </div>
          )}
          <span className="text-sm font-medium text-gray-900">{customer.name}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row: any) => row.email,
    id: 'email',
    header: () => <div className="text-sm font-semibold text-gray-700">Email</div>,
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-sm font-semibold text-gray-700">Joined Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <div className="text-sm text-gray-500">{formattedDate}</div>;
    },
  },
];
