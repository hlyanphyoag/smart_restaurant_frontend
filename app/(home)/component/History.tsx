import { Loading } from "@/components/Loading";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import clsx from "clsx";
import { useSocketContext } from "@/provider/SocketContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { SkeletonKitChen } from "@/app/kitchen/components/SkeletonForKitchen";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";

interface CommonCardProps {
  OrderData: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isPending: boolean;
}

const HistoryPage = ({
  OrderData,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  isPending,
}: CommonCardProps) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);
  // const {addListner} = useSocketContext()
  // const queryClient = useQueryClient()

  useEffect(() => {
    // OrderData?.forEach((order: any) => {
    //   addListner(`${order.id}-changes`, (data: any) => {
    //     console.log("Data:", data)
    //     queryClient.invalidateQueries({
    //       queryKey: ["orders-infinite"]
    //     })
    //   })
    // })

    if (!loadingRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadingRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  if (isPending)
    return (
      <div className="flex flex-col gap-y-6 items-center justify-center">
        <SkeletonKitChen />
        <SkeletonKitChen />
        <SkeletonKitChen />
      </div>
    );

  return (
    <div>
      {OrderData?.map((order: any, index: number) => {
        console.log("OrderStatus:", order.status);
        return (
          <Card key={index} className={clsx(`mb-2`)}>
            <CardContent>
              <div className="flex flex-col mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-semibold">Order</h2>
                  <small className="text-sm text-blue-500">#{order.id}</small>
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    {order.status === "READY"
                      ? "Ready"
                      : order.status === "PENDING"
                      ? "Pending"
                      :order.status === "COMPLETED"
                      ? "Complete"
                      : "Progress"}
                  </Badge>
                </div>
              </div>
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex flex-col mt-2">
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-x-2">
                      <img
                        src={
                          item?.foodItem?.images[
                            item.foodItem.images.length - 1
                          ]
                        }
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <small className="text-sm font-semibold">
                          {item.foodItem.name}
                        </small>
                        <small className="text-xs font-semibold">
                          ${item.foodItem.price}
                        </small>
                      </div>
                    </div>
                    <div>
                      <small className="text-sm">Qty - {item.quantity}</small>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <small className="text-sm font-semibold">
                  Total: ${order.totalCost}
                </small>
                <small className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt, "dd MMMM yy, HH:mm:ss")}
                </small>
              </div>
            </CardFooter>
          </Card>
        );
      })}

      <div ref={loadingRef} className="h-5" />

      {isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}

      {!hasNextPage && (
        <div className="flex items-center justify-center text-muted-foreground">
          <small>No more orders</small>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
