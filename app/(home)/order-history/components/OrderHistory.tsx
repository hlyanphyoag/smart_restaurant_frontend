"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useGetOrderHistoryQuery, useGetPendingOrderQuery } from "@/services/OrderServices/order.query";
import CommonCard from "@/app/kitchen/components/CommonCard";
import HistoryPage from "../../component/History";

const OrderHistory = () => {
  const {
    data: OrderData,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetOrderHistoryQuery("COMPLETED", "3");


  const readyOrderData = OrderData?.pages?.flatMap((page) => page.results);

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-lg font-bold">History</h1>
        <div className="flex flex-col gap-y-3 w-full md:w-lg">
          <HistoryPage
            OrderData={readyOrderData}
            isPending = {isPending}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
    </div>
  );
};

export default OrderHistory;
