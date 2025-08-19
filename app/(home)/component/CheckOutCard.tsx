"use client";
import { useCartStore } from "@/store/CartStore";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useOrderMutation } from "@/services/OrderServices/order.queryMutation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PaymentModal from "./PaymentModal";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";

const CheckOutCard = () => {
  const {
    cart,
    decreaseQuantity,
    increaseQuantity,
    removeAllCart,
    GrandTotalPrice,
    removeFromCart,
  } = useCartStore();

  const [open, setOpen] = useState(false);

  return (
    <Card className="min-w-xs col-span-2 shadow-lg border-2 border-gray-100 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-800">
          Cart
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length ? (
          <div className="flex flex-col gap-4">
            {cart.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between gap-4 bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-800 truncate max-w-[120px]">
                      {item.name}
                    </p>
                    <p className="text-sm text-green-600 font-bold mt-1">
                      {item.totalPrice ? item.totalPrice : item.price} MMK
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-gray-200 transition-colors"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <MinusIcon size={18} />
                  </Button>
                  <span className="text-base font-semibold text-gray-700 px-2 min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    disabled={item.quantity === item.availableQuantity}
                    variant="outline"
                    size="icon"
                    className="hover:bg-gray-200 transition-colors"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <PlusIcon size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-100 text-red-500 ml-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <XIcon size={18} />
                  </Button>
                </div>
              </div>
            ))}
            <CardFooter className="flex flex-row items-center justify-between gap-2 mt-4 border-t pt-4 border-gray-200">
              <span className="text-lg font-semibold text-gray-700">Total</span>
              <span className="text-2xl font-bold text-green-500">
                {GrandTotalPrice()} MMK
              </span>
            </CardFooter>
            <div className="flex flex-col gap-2 mt-2">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={cart.length === 0}
                    type="button"
                    variant="customize"
                    className="w-full py-3 text-lg font-semibold rounded-xl shadow hover:bg-green-500 hover:text-white transition-colors"
                  >
                    Checkout
                  </Button>
                </DialogTrigger>
                <PaymentModal setOpen={setOpen} />
              </Dialog>
              <Button
                variant="secondary"
                className="w-full py-3 text-lg font-semibold rounded-xl shadow hover:bg-gray-200 transition-colors"
                disabled={cart.length === 0}
                onClick={removeAllCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3.75h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0l1.7 6.385m.563 2.116A2.25 2.25 0 009.75 17.25h7.5a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25h-11.1l-.383-1.437A1.125 1.125 0 004.386 3.75H2.25m3.75 3.75h13.5m-10.5 9.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-600">
              Your cart is empty!
            </h3>
            <p className="text-gray-400">
              Looks like you haven't added anything yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckOutCard;
