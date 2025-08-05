"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import CommonCard from "./CommonCard";
import { useGetPendingOrderQuery } from "@/services/OrderServices/order.query";

const StockRequestCard = () => {
  const {
    data: OrderData,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPendingOrderQuery("INGREDIENTS_APPROVED", "3");


  const requestOrderData = OrderData?.pages?.flatMap((page) => page.results);

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-lg font-bold">Making Foods</h1>
      <ScrollArea className="h-[550px] w-[350px] rounded-md border p-4">
        <div className="flex flex-col gap-y-3">
          <CommonCard
            OrderData={requestOrderData}
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

export default StockRequestCard;
