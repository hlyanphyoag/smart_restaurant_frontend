"use client";
import { DataTable } from "@/app/cashier/Components/data-table";
import { useGetFoodQuery } from "@/services/foodServices/food.query";
import { useTableStore } from "@/store/TableStore";
import Lottie from "lottie-react";
import React from "react";
import { columns } from "./columns";

const ProductTable = () => {
  const { pageIndex, pageSize } = useTableStore();
  const {
    data: ProductData,
    isPending,
    isError,
  } = useGetFoodQuery("", (pageIndex + 1).toString(), pageSize.toString());
  console.log("ProductData:", ProductData);

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <div className="h-60 w-60">
          <Lottie
            animationData={require("@/public/loading.json")}
            loop={true}
            autoPlay={true}
            size={100}
          />
        </div>
      </div>
    );
  if (isError) return <div>Error</div>;
  return (
    <DataTable columns={columns} data={ProductData?.results} totalPages={ProductData?.totalPages} totalElements={ProductData?.totalElements}/>
  );
};

export default ProductTable;
