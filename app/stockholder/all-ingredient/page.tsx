"use client";
import React from "react";
import { useGetAllOrderQuery } from "@/services/OrderServices/order.query";
import { useStatusStore } from "@/store/StatusStore";
import { useTableStore } from "@/store/TableStore";
import Lottie from "lottie-react";
import { DataTable } from "@/app/cashier/Components/data-table";
import { columns } from "../components/columns";
import { useIngredientsByPagination } from "@/services/IngredientsSevices/ingredients.query";
import { ingredientColumns } from "../components/ingredient-columns";

const page = () => {
  const { pageIndex, pageSize } = useTableStore();
//   const { status } = useStatusStore();
  const {
    data: IngredientLists,
    isPending,
    isError,
  } = useIngredientsByPagination(pageSize.toString(), (pageIndex + 1).toString());

  console.log("IngredientLists:", IngredientLists?.results);
  if (isPending) return <div className="flex items-center justify-center">
    <div className="h-60 w-60">
    <Lottie
      animationData={require("@/public/loading.json")}
      loop={true}
      autoPlay={true}
      size={100}
    />
    </div>
  </div>;
  if (isError) return <h2>Error</h2>;
  return (
    <div className="flex flex-col gap-6 justify-center items-center mb-10">
      <DataTable
        columns={ingredientColumns}
        data={IngredientLists?.results}
        totalPages={IngredientLists?.totalPages}
        totalElements={IngredientLists?.totalElements}
      />
    </div>
  );
};

export default page;
