// ...existing imports...
// Status helpers from order-history page
const getProgress = (status: string) => {
  switch (status) {
    case "PENDING":
      return 10;
    case "CONFIRMED":
      return 30;
    case "WAITING_FOR_INGREDIENTS":
      return 45;
    case "INGREDIENTS_APPROVED":
      return 60;
    case "READY":
      return 85;
    case "COMPLETED":
      return 100;
    default:
      return 25;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "CONFIRMED":
      return "Confirmed";
    case "WAITING_FOR_INGREDIENTS":
      return "Waiting for Ingredients";
    case "INGREDIENTS_APPROVED":
      return "Ingredients Approved";
    case "READY":
      return "Ready";
    case "COMPLETED":
      return "Completed";
    default:
      return "Progress";
  }
};
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
import { AnimatedCircularProgressBar } from "@/components/ui/moving-progress";
import { format } from "date-fns";
import Link from "next/link";

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
          <Link key={order.id} href={`/order-history/${order.id}`}>
            <Card className={clsx(`mb-2 cursor-pointer`)}>
              <CardContent>
                <div className="flex flex-col mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md font-semibold">Order</h2>
                    <small className="text-sm text-blue-500">#{order.id}</small>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <Badge variant="outline" className="text-xs">
                      {getStatusLabel(order.status)}
                    </Badge>
                    {order.bill && (
                      <Badge
                        variant={order.bill.paid ? "secondary" : "destructive"}
                        className={`text-xs ${
                          order.bill.paid
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.bill.paid ? "Paid" : "Not Paid"}
                      </Badge>
                    )}
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
                            {item.foodItem.price} MMK
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
              {/* <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <AnimatedCircularProgressBar
                      max={100}
                      min={0}
                      fontSize="text-sm"
                      value={getProgress(order.status)}
                      gaugePrimaryColor="#2563eb"
                      gaugeSecondaryColor="#d1d5db"
                      className="w-12 h-12"
                    />
                    <span className="text-xs mt-1">
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <small className="text-sm font-semibold">
                      Total: ${order.totalCost}
                    </small>
                    <small className="text-sm text-muted-foreground">
                      {format(
                        new Date(order.createdAt),
                        "MMM dd, yyyy • hh:mm a"
                      )}
                    </small>
                  </div>
                </div>
              </CardFooter> */}
            </Card>
          </Link>
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
