"use client";
import { DataTable } from "@/app/cashier/Components/data-table";
import { useTableStore } from "@/store/TableStore";
import { columns } from "./column";
import Lottie from "lottie-react";
import React from "react";
import { useQueryStockTransaction } from "@/services/StockServices/stock.query"; // <-- new query hook

const StockTransactionPage = () => {
  const { pageIndex, pageSize } = useTableStore();
  const {
    data: stockData,
    isPending,
    isError,
  } = useQueryStockTransaction((pageIndex + 1).toString(), pageSize.toString());

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <div className="h-60 w-60">
          <Lottie
            animationData={require("@/public/loading.json")}
            loop
            autoPlay
          />
        </div>
      </div>
    );

  if (isError) return <div>Error loading transactions</div>;

  return (
    <DataTable
      data={stockData?.results}
      columns={columns}
      totalPages={stockData?.totalPages}
      totalElements={stockData?.totalElements}
    />
  );
};

export default StockTransactionPage;
