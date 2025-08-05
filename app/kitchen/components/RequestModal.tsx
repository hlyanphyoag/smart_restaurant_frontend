"use client";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStockMutation } from "@/services/StockServices/stock.mutation";
import { useSession } from "next-auth/react";
import { stockRequestStore } from "@/store/IngredientStore";
import { toast } from "sonner";
import { useOrderStatusMutation } from "@/services/OrderServices/order.queryMutation";


const RequestModal = ({ order }: { order: any }) => {
  const orderId = order.id
  const {orderItemStock, setStockRequest} = stockRequestStore()
  const kitchenId = useSession().data?.user?.id;
  const { mutate: stockMutation, isPending, isError }= useStockMutation();
  const { mutate: orderStatusMutation } = useOrderStatusMutation()

  const [ingredientFilterByOrderId] = orderItemStock?.filter((item: any) => item.id === orderId).map((item: any) => item.ingredients)

  const ingredientRequestToApi = ingredientFilterByOrderId?.map((item: any) => {
    return {
      ingredientId: item.ingredientId,
      quantity: item.quantity
    }
  })

  useEffect(() => {
    order?.items?.forEach((item: any) => {
      const itemQuantity = item.quantity
      item.foodItem.ingredients?.forEach((item: any) => {
       const  ingredientId = item.ingredient.id;
       const ingredientQuantity = item.quantity;
       setStockRequest(orderId, {
        name: item.ingredient.name,
        ingredientId: ingredientId,
        quantity: ingredientQuantity * itemQuantity
       })
      })
    })
  },[order, setStockRequest])

  // console.log("fromstore:", ingredientFilterByOrderId)
  // console.log("stockRequest", ingredientRequestToApi)

  const handleSubmit = () => {
    stockMutation({
      kitchenUserId: kitchenId,
      orderId: orderId,
      ingredients: ingredientRequestToApi
    },{
      onSuccess: (data: any) => {
        console.log("StockRequestData:", data)
        toast.success("Stock Requested Successfully")
      },
      onError: (error: any) => {
        console.log(error)
      },
    })
  }


  return (
    <DialogContent>
      <DialogTitle className="text-lg font-semibold text-gray-600">
        Stock Requests
      </DialogTitle>
      <DialogDescription>
          Are you sure you want to request ingredients?
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
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-4">
                  <p className="text-md font-semibold">{item.foodItem.name}</p>
                  <p className="text-md font-semibold">Qty - {item.quantity}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  {item.foodItem.ingredients.map((item: any, index: number) => {
                    return (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item.ingredient.name}-{item.quantity}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )})}

        <DialogClose>
          <Button asChild type="submit" onClick={handleSubmit} variant="request_ingredients" size="sm" className="w-full mt-4">
            <span>Request Ingredients</span>
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default RequestModal;
