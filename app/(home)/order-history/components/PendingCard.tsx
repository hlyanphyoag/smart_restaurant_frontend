"use client";
import { Card, CardContent } from "@/components/ui/card";
import { LucideTimer } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useGetOrderHistoryQuery } from "@/services/OrderServices/order.query";
import { AnimatedCircularProgressBar } from "@/components/ui/moving-progress";
import Lottie from "lottie-react";
import { notiStore } from "@/store/StatusStore";

const PendingCard = () => {
  const {
    data: OrderHistoryData,
    isPending,
    isError,
  } = useGetOrderHistoryQuery("", "3");
  const readyOrderData = OrderHistoryData?.pages?.flatMap(
    (page) => page.results
  );
  const [activeReady, setActiveReady] = useState(false);

  // console.log("Ready Order Data: ", readyOrderData);

  const pendingOrder = readyOrderData?.find(
    (order: any) => order.status !== "COMPLETED"
  );
  console.log("Pending Order: ", pendingOrder);
  const { notifications, setNotifications } = notiStore();

  useEffect(() => {
    const active = pendingOrder?.status === "READY" ? true : false;
    if (active) {
      setTimeout(() => {
        setActiveReady(active);
        // setNotifications(pendingOrder)
        console.log("PendingOrder:", pendingOrder);
      }, 1000);
    } else {
      console.log("Active error");
    }
  }, [pendingOrder]);

  console.log("Notification:", notifications);

  if (OrderHistoryData)
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Pending Order</h2>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-y-2">
            {activeReady ? (
              <div className="w-40 h-40">
                <Lottie
                  animationData={require("@/public/success_mark.json")}
                  loop={false}
                  autoPlay={true}
                  size={100}
                />
              </div>
            ) : (
              <AnimatedCircularProgressBar
                max={100}
                min={0}
                value={
                  pendingOrder.status === "PENDING"
                    ? 10
                    : pendingOrder.status === "CONFIRMED"
                    ? 50
                    : pendingOrder.status === "WAITING_FOR_INGREDIENTS" || pendingOrder.status === "INGREDIENTS_APPROVED"
                    ? 75
                    : pendingOrder.status === "READY" || pendingOrder.status === "COMPLETED"
                    ? 100
                    : 25
                }
                gaugePrimaryColor="#2563eb"
                gaugeSecondaryColor="#d1d5db"
              />
            )}
            <h2 className="text-lg font-bold">
              Your Order is{" "}
              {pendingOrder?.status === "PENDING"
                ? "Pending"
                : pendingOrder?.status === "CONFIRMED"
                ? "Confirmed"
                : pendingOrder?.status === "READY"
                ? "Ready"
                : "in Progress"}
              !
            </h2>
            <p className="text-sm text-muted-foreground">
              Your order is currently being prepared. Please wait for it to be
              ready.
            </p>
          </CardContent>
        </Card>
      </div>
    );
};

export default PendingCard;
