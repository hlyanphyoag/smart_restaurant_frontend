"use client";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOneOrderQuery } from "@/services/OrderServices/order.query";
import { useCartStore } from "@/store/CartStore";
import Lottie from "lottie-react";
import { IndentIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const SuccessPage = () => {
  const router = useRouter();
  const { id: orderId }: { id: string } = useParams();
  const { data: OrderData, isPending, error } = useGetOneOrderQuery(orderId);
  const { cart, removeAllCart, GrandTotalPrice } = useCartStore();
  console.log("OrderData:", OrderData);

  const handleGoBack = () => {
    removeAllCart();
    router.push("/");
  };

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        {error.message}
      </div>
    );
  }

  const isCashierOrder = OrderData?.customer?.role === "CASHIER";
  const isDigitalPayment = OrderData?.bill?.paymentMethod === "DIGITAL";
  const showQRCode =
    isCashierOrder &&
    isDigitalPayment &&
    OrderData?.bill?.stripeUrl &&
    !OrderData?.bill?.paid;

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="w-40 h-40">
        <Lottie
          animationData={require("@/public/success_mark.json")}
          loop={false}
          autoPlay={true}
          size={100}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-y-1">
        <h2 className="text-3xl font-bold text-green-400">Order Success!</h2>
        <p className="text-md font-semibold text-gray-600">
          Thank you for your order.
        </p>
        <small className="text-sm font-semibold text-gray-500">
          Your delicious meal is being prepared!
        </small>
      </div>

      {showQRCode && (
        <Card className="w-full max-w-md mt-6">
          <CardHeader>
            <CardTitle>Payment QR Code</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg">
              <QRCodeCanvas
                value={OrderData.bill.stripeUrl}
                size={256}
                level={"H"}
                includeMargin={true}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Scan this QR code to complete your payment
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="w-full mt-6">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Order Details</CardTitle>
          <div className="border border-green-400 px-2 py-1 rounded-full text-sm font-semibold text-green-400">
            Confirm
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-start justify-center gap-x-6 gap-y-6">
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex items-center  gap-x-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Order ID:{" "}
              </h2>
              <small className="text-sm font-semibold text-blue-500">
                #{OrderData?.id}
              </small>
            </div>
            <div className="flex items-center  gap-x-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Order Type:{" "}
              </h2>
              <small className="text-sm font-semibold text-gray-600">
                {OrderData?.tableId
                  ? `( Dine in ) - Table No. ${OrderData?.table?.number}`
                  : "Take Away"}
              </small>
            </div>
            <div className="flex items-center gap-x-4">
              <h2 className="text-sm font-semibold text-gray-600">
                Estimated Time:{" "}
              </h2>
              <small className="text-sm font-semibold text-green-400">
                15mins - 20mins
              </small>
            </div>
            <div className="flex items-center gap-x-4">
              <h2 className="text-sm font-semibold text-gray-600">Total: </h2>
              <small className="text-xl font-semibold text-green-400">
              {OrderData?.totalCost} MMK
              </small>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            {OrderData?.items?.map((item: any, index: number) => (
              <div
                className="flex flex-col bg-neutral-100 p-4 rounded-2xl"
                key={index}
              >
                <div className="flex flex-row items-center justify-between gap-x-4">
                  <div className="flex items-center gap-x-2">
                    <img
                      src={
                        item.foodItem?.images[item.foodItem?.images.length - 1]
                      }
                      alt={item.foodItem?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="text-sm font-semibold text-gray-600">
                        {item.foodItem?.name}
                      </h2>
                      <small className="text-sm text-gray-500">
                        Qty - {item.quantity}
                      </small>
                    </div>
                  </div>
                  <small className="text-sm font-semibold text-green-400">
                    {(item.foodItem.price * item.quantity).toFixed(2)} MMK
                  </small>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        variant="customize"
        onClick={handleGoBack}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mt-4"
      >
        Go Home
      </Button>
    </div>
  );
};

export default SuccessPage;
