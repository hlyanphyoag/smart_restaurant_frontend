import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApproveStockMutation } from "@/services/StockServices/stock.mutation";
import { error } from "console";
import React, { useState } from "react";
import { toast } from "sonner";

interface stockRequest {
  id: string;
  ingredientId: string;
  quantity: number;
  ingredient: {
    id: string;
    name: string;
    stock: number;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
  };
  stockRequestId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HolderModalProps {
  status: string;
  stockRequestId: string;
  requestStock: stockRequest[];
}

const HolderModal = ({status, stockRequestId, requestStock }: HolderModalProps) => {
  const {
    mutate: approveStockMutation,
    isPending,
    isError,
  } = useApproveStockMutation();


  const handleRequestSubmit = (id: string) => {
    approveStockMutation(id, {
      onSuccess: (data: any) => {
        toast.success("Stock Request Approved!");
      },
      onError: (error: any) => {
        console.log("Error:", error);
        toast.error("Stock Request Failed!");
      },
    });
  };
  return (
    <DialogContent>
      <DialogTitle>Stock Request Details</DialogTitle>
      <div className="flex flex-col gap-y-6 items-center justify-center mt-4">
        {requestStock.map((stock) => (
          <div
            key={stock.id}
            className="flex justify-between items-center gap-x-6"
          >
            <Badge>{stock.ingredient.name}</Badge>
            <div>
              <small className="text-muted-foreground"> Requested Qty - </small>
              <Badge className="bg-green-400 text-white">
                {stock.quantity}
              </Badge>
            </div>
            <div>
              <small className="text-muted-foreground"> Stock Qty - </small>
              <Badge className="bg-blue-400 text-white">
                {stock.ingredient.stock}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      <DialogClose asChild>
        <Button
          disabled={status === "APPROVED"}
          type="submit"
          onClick={() => handleRequestSubmit(stockRequestId)}
          variant="customize"
          className="mt-6 w-full"
        >
          <span>{status === "APPROVED" ? "Approved" : "Approve"}</span>
        </Button>
      </DialogClose>
    </DialogContent>
  );
};

export default HolderModal;
