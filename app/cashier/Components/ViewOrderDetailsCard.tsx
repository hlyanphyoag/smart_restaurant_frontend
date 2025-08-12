"use client";
import { Loading } from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetOneOrderQuery } from "@/services/OrderServices/order.query";
import { useOrderUpdateStatusMutation } from "@/services/OrderServices/order.queryMutation";

export const ViewOrderDetailsModal = ({ id }: { id: string }) => {
  const {
    data: orderDetailsById,
    isPending,
    isError,
  } = useGetOneOrderQuery(id);

  console.log("OrderDetailsById:", orderDetailsById);

  const { mutate: updateStatus, isPending: isLoading } =
    useOrderUpdateStatusMutation();

  const handleUpdateStatus = () => {
    if (orderDetailsById?.status === "PENDING") {
      updateStatus({ id: orderDetailsById.id, status: "ready" });
    } else {
      updateStatus({ id: orderDetailsById.id, status: "complete" });
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <h2>Error</h2>;

  return (
    <Card className="w-lg">
      <CardHeader>
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-x-2">
            <div>
              {orderDetailsById?.customer?.profilePic ? (
                <img
                  src={orderDetailsById?.customer?.profilePic}
                  alt={orderDetailsById?.customer?.name}
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-green-400 text-white font-semibold flex items-center justify-center">
                  {orderDetailsById?.customer?.name[0]}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-md font-bold text-gray-600">
                {orderDetailsById?.customer?.name}
              </h2>
              <small className="text-sm text-gray-500">
                {orderDetailsById?.customer?.email}
              </small>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Order ID</h1>
          <h2 className="text-md text-blue-500">#{orderDetailsById?.id}</h2>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Customer ID</h1>
          <h2 className="text-md text-blue-500">
            #{orderDetailsById?.customerId}
          </h2>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Order Type</h1>
          <h2 className="text-md text-gray-600">
            {orderDetailsById?.tableId ? "Dine In/" : "Take Away"}(
            {orderDetailsById?.tableId
              ? `Table No. ${orderDetailsById?.table?.number}`
              : ""}
            )
          </h2>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Order Status</h1>
          <h2 className="text-md">
            {orderDetailsById?.status === "PENDING" ? (
              <Badge
                variant="outline"
                className="bg-orange-100 text-orange-500"
              >
                Pending
              </Badge>
            ) : orderDetailsById?.status === "CONFIRMED" ? (
              <Badge variant="secondary" className="bg-red-100 text-red-500">
                Progress
              </Badge>
            ) : (
              <Badge variant="secondary">Completed</Badge>
            )}
          </h2>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Total Price </h1>
          <h2 className="text-md text-gray-600">
            ${orderDetailsById?.totalCost?.toFixed(2)}
          </h2>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Payment</h1>
          <h2 className="text-md text-green-400 font-bold">
            {orderDetailsById?.bill?.paymentMethod}
          </h2>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md font-semibold">Payment Status</h1>
          <h2 className="text-md text-blue-500">
            {orderDetailsById?.bill?.paid ? "Paid" : "Not Paid"}
          </h2>
        </div>

        {orderDetailsById.bill.paymentMethod === "DIGITAL" && (
          <div className="flex justify-between">
            <h1 className="text-md font-semibold">Address</h1>
            <h2 className="text-md text-blue-500">
              {orderDetailsById?.address}
            </h2>
          </div>
        )}

        <div className="flex flex-col gap-y-2 justify-center items-center">
          <h2 className="text-md font-semibold">Order Items</h2>
          <div className="flex flex-wrap gap-2">
            {orderDetailsById.items.map((item: any) => (
              <div
                key={item.id}
                className="flex  items-center border border-gray-200 p-2 rounded-md gap-x-2"
              >
                <img
                  src={item.foodItem.images[item.foodItem.images.length - 1]}
                  alt={item.foodItem.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-sm font-semibold">
                    {item.foodItem.name}
                  </h2>
                  <small className="text-sm text-gray-500">
                    Qty - {item.quantity}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <CardAction>
          <Button
            variant={
              orderDetailsById?.status === "PENDING" ? "customize" : "secondary"
            }
            onClick={handleUpdateStatus}
            disabled={isLoading || orderDetailsById?.status === "COMPLETED"}
            className="w-80"
          >
            {orderDetailsById?.status === "PENDING" ? "Confirm" : "Complete"}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
