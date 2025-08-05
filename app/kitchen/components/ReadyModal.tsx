"use client";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useOrderStatusMutation } from "@/services/OrderServices/order.queryMutation";
import { toast } from "sonner";


const ReadyModal = ({ order }: { order: any }) => {
  const {mutate: readyOrderMutation, isPending, isError } = useOrderStatusMutation();
  const orderId = order.id

  const handleSubmit = () => {
    console.log("Ready")
    readyOrderMutation ({
      id: orderId,
    }, {
      onSuccess : (data: any) => {
        console.log(data)
        toast.success("Order marked as ready")
      },
      onError : (error: any) => {
        console.log(error)
        toast.error("Order marked as ready failed")
      }
    })
  }


  return (
    <DialogContent>
      <DialogTitle className="text-lg font-semibold text-gray-600">
        Ready Order
      </DialogTitle>
      <DialogDescription>
          Are you sure you want to mark this order as ready?
      </DialogDescription>
      <div className="flex flex-col gap-y-6 mt-6">
        {order?.items.map((item: any, index: number) => { 
          
          return(
          <div key={index}>
            <div className={`flex items-center gap-x-2  ${index !== order.items.length - 1 ? "pb-3 border-b border-gray-200" : ""}`}>
              <img
                src={item.foodItem.images[item.foodItem.images.length - 1]}
                alt=""
                className="h-15 w-15 rounded-full"
              />
                <div className="flex flex-col  gap-y-1">
                  <p className="text-md font-semibold">{item.foodItem.name}</p>
                  <p className="text-sm font-semibold">Qty - {item.quantity}</p>
                </div>
            </div>
          </div>
        )})}

        <DialogClose>
          <Button asChild type="submit" onClick={handleSubmit} variant="ready_order" size="sm" className="w-full mt-4" disabled={order.status === "READY"}>
            <span>Ready Order</span>
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default ReadyModal;
