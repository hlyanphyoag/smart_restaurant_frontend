"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetOneOrderQuery } from "@/services/OrderServices/order.query";
import { Badge } from "@/components/ui/badge";
import { AnimatedCircularProgressBar } from "@/components/ui/moving-progress";
import { format } from "date-fns";
import { useSocketContext } from "@/provider/SocketContextProvider";
import { useQueryClient } from "@tanstack/react-query";
import { getOrderKey } from "@/services/OrderServices/order.queryKey";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const getProgress = (status: string) => {
  switch (status) {
    case "PENDING":
      return 10;
    case "CONFIRMED":
      return 50;
    case "READY":
      return 75;
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
    case "READY":
      return "Ready";
    case "COMPLETED":
      return "Completed";
    default:
      return "Progress";
  }
};

const OrderDetailPage = () => {
  const queryClient = useQueryClient();
  const { orderId } = useParams();

  const {
    data: order,
    isPending,
    isError,
  } = useGetOneOrderQuery(orderId as string);

  const { addListner } = useSocketContext();

  useEffect(() => {
    const unsubscribe = addListner(`${order?.id}-order-changes`, () => {
      queryClient.invalidateQueries({
        queryKey: getOrderKey.getOneOrderKey(order?.id),
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [order?.id]);

  const handleCopyPaymentLink = () => {
    if (order?.bill?.stripeUrl) {
      navigator.clipboard.writeText(order.bill.stripeUrl);
      toast.success("Payment link copied to clipboard!");
    }
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  if (isError || !order)
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Order not found.
      </div>
    );

  const showPaymentOptions =
    order.bill && !order.bill.paid && order.bill.stripeUrl;

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-2 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-2xl">
        {/* Progress Section */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">Order ID</span>
              <span className="text-lg font-bold text-blue-700">
                #{order.id}
              </span>
            </div>
            <div className="flex gap-2 items-center">
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
          <div className="flex flex-col items-center mt-4">
            <AnimatedCircularProgressBar
              max={100}
              min={0}
              value={getProgress(order.status)}
              gaugePrimaryColor="#2563eb"
              gaugeSecondaryColor="#d1d5db"
              className="w-24 h-24 drop-shadow-md"
            />
            <span className="text-base mt-2 text-blue-700 font-semibold tracking-wide">
              Your order is {getStatusLabel(order.status)}
            </span>
          </div>
        </div>

        {/* Payment Section (if not paid) */}
        {showPaymentOptions && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Complete Your Payment
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <QRCodeCanvas
                  value={order.bill.stripeUrl}
                  size={180}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-gray-600">
                  Scan the QR code or click the button below to complete your
                  payment.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a
                      href={order.bill.stripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pay Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCopyPaymentLink}
                    className="flex items-center gap-2"
                  >
                    <Copy size={16} />
                    Copy Payment Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Info Section */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
            <div>
              <span className="font-semibold text-gray-500">Created:</span>
              <span className="ml-2 text-gray-700">
                {format(new Date(order.createdAt), "MMM dd, yyyy • hh:mm a")}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Total:</span>
              <span className="ml-2 text-blue-700 font-bold">
                ${order.totalCost}
              </span>
            </div>
          </div>
          {order.bill && (
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-2">
              <span className="text-xs text-gray-400">
                Bill ID: {order.bill.id}
              </span>
              <span className="text-xs text-gray-400">
                Payment: {order.bill.paid ? "Paid" : "Not Paid"}
              </span>
            </div>
          )}
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <span className="font-semibold text-gray-500 mb-4 block">
            Order Items
          </span>
          <div className="flex flex-col gap-4">
            {order.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={
                    item?.foodItem?.images?.[item.foodItem.images.length - 1]
                  }
                  alt={item.foodItem.name}
                  className="w-14 h-14 rounded-xl object-cover border shadow-sm"
                />
                <div className="flex flex-col flex-1">
                  <span className="font-semibold text-gray-800 text-base">
                    {item.foodItem.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="font-semibold text-blue-700 text-lg">
                  ${item.foodItem.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
