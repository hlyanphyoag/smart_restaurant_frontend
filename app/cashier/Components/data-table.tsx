"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./tablePagination";
import { useTableStore } from "@/store/TableStore";
import { useStatusStore } from "@/store/StatusStore";

export function DataTable<TData, TValue>({
  totalElements,
  totalPages,
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const {setPageIndex, setPageSize, pageIndex, pageSize} = useTableStore()
  const {status} = useStatusStore()
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter ] = React.useState<string>("")

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
     pagination: {
      pageIndex,
      pageSize
     } 
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    pagination: {
        pageIndex,
        pageSize
      }
    },
    onPaginationChange: (update) => {
      const next = typeof update === "function"
        ? update({ pageIndex, pageSize })
        : update;
    
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
  });

  return (
    <div className="w-5xl">
      <div className="flex items-center justify-between  py-4">
        <h2 className="text-xl font-semibold text-gray-600">{status ?  status === "CONFIRMED" ? "Preparing" : status.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) :  "Total"} Orders ( {totalElements} )</h2>
        <Input
          placeholder="Filter customer..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        <DataTablePagination table={table}/>
    </div>
  );
}
