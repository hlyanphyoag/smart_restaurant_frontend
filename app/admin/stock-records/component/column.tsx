"use client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="text-sm font-semibold text-gray-700">Transaction ID</div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-800">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "ingredient.name",
    header: () => (
      <div className="text-sm font-semibold text-gray-700">Ingredient</div>
    ),
    cell: ({ row }) => {
      const ing = row.original.ingredient;
      return (
        <div className="text-sm font-medium text-gray-900">
          {ing?.name} ({ing?.unit})
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => (
      <div className="text-sm font-semibold text-gray-700">Type</div>
    ),
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            type === "INPUT"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => (
      <div className="text-sm font-semibold text-gray-700">Quantity</div>
    ),
    cell: ({ row }) => {
      const q = row.original.quantity;
      return (
        <div className="text-sm font-semibold text-gray-800">
          {q} {row.original.ingredient?.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: () => (
      <div className="text-sm font-semibold text-gray-700">Reason</div>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.original.reason ?? "-"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-sm font-semibold text-gray-700">Date</div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return <div className="text-sm text-gray-500">{formattedDate}</div>;
    },
  },
];
