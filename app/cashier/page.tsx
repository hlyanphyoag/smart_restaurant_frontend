"use client";
import React from "react";
import StatusCard from "./Components/StatusCard";
import { useGetAllOrderQuery } from "@/services/OrderServices/order.query";
import { useStatusStore } from "@/store/StatusStore";
import { columns } from "./Components/column";
import { DataTable } from "./Components/data-table";
import { useTableStore } from "@/store/TableStore";
import Lottie from "lottie-react";

const page = () => {
  const { pageIndex, pageSize } = useTableStore();
  const { status } = useStatusStore();
  const {
    data: OrderLists,
    isPending,
    isError,
  } = useGetAllOrderQuery(status, pageSize.toString(), (pageIndex + 1).toString());
  console.log("OrderLists:", OrderLists?.results);
  if (isPending) return <div className="flex items-center justify-center">
    <div className="h-60 w-60">
    <Lottie
      animationData={require("../../public/loading.json")}
      loop={true}
      autoPlay={true}
      size={100}
    />
    </div>
  </div>;
  if (isError) return <h2>Error</h2>;
  return (
    <div className="flex flex-col gap-6 justify-center items-center mb-10">
      <StatusCard/>
      <DataTable
        columns={columns}
        data={OrderLists?.results}
        totalPages={OrderLists?.totalPages}
        totalElements={OrderLists?.totalElements}
      />
    </div>
  );
};

export default page;
