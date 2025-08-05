"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import CommonCard from "./CommonCard";
import { useGetPendingOrderQuery } from "@/services/OrderServices/order.query";

const ProgressOrderCard = () => {
  const {
    data: OrderData,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPendingOrderQuery("CONFIRMED", "3");


  const pendingOrderData = OrderData?.pages?.flatMap((page) => page.results);

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-lg font-bold">Pending Foods</h1>
      <ScrollArea className="h-[550px] w-[350px] rounded-md border p-4">
        <div className="flex flex-col gap-y-3">
          <CommonCard
            OrderData={pendingOrderData}
            isPending = {isPending}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProgressOrderCard;
