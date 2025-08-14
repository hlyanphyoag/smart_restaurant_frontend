import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrderMutation } from "@/services/OrderServices/order.queryMutation";
import { useAuthStore } from "@/store/AuthStore";
import { useCartStore } from "@/store/CartStore";
import { PaymentMethod } from "@/types/order";
import { IconCash } from "@tabler/icons-react";
import { CardSim } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";

const PaymentModal = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id: tableId } = useParams();
  const { cart, GrandTotalPrice, removeAllCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const routename = usePathname();
  const isPosRoute = routename.includes("/cashier/pos");
  const { authUser } = useAuthStore();
  // console.log("posRoute:", posRoute

  const { mutate: postOrder } = useOrderMutation();

  const handleSubmit = (paymentMethod: PaymentMethod) => {
    postOrder(
      {
        tableId: tableId as string,
        customerId: authUser?.id!,
        payment_method: paymentMethod,
        totalCost: Number(GrandTotalPrice()),
        orderItems: cart?.map((item: any) => {
          return {
            foodItemId: item.id,
            quantity: item.quantity,
            note: item.note,
          };
        }),
        address: address ? address : "",
      },
      {
        onSuccess: (data) => {
          toast.success("Order placed successfully!");
          removeAllCart();
          if (isPosRoute) {
            if (paymentMethod === "DIGITAL") {
              router.push(`/success/${data.id}`);
            } else {
              setOpen(false);
              router.replace(`/cashier/pos`);
            }
          } else {
            if (paymentMethod === "CASH") {
              router.push(`/success/${data.id}`);
            } else if (paymentMethod === "DIGITAL" && data.bill) {
              window.open(data.stripeUrl!, "_blank");
            }
            setOpen(false);
          }

          console.log("OrderSuccess:", data);
        },
        onError: (error) => {
          console.log("OrderError:", error);
          toast.error("Failed to place order. Please try again.");
        },
      }
    );
  };

  // const handlePayWithStripe = () => {
  //   stripeMutation(orderId, {
  //     onSuccess: (StripeData) => {
  //       console.log("StripeSuccess:", StripeData.url);
  //       window.location.href = StripeData.url;
  //       return;
  //     },
  //     onError: (error) => {
  //       console.log("StripeError_really:", error);
  //     },
  //   });
  // };

  // const OrderByCashier = () => {
  //   orderByCashierMutation({id: orderId}, {
  //     onSuccess: (data)=> {
  //       console.log("OrderByCashierSuccess:", data)
  //       toast.success("Hey Cashier, your order is success!")
  //       router.push("/cashier")
  //     },
  //     onError: (error) => {
  //       console.log("OrderByCashierError:", error)
  //       toast.error("Hey Cashier, your order is failed!")
  //     }
  //   })
  // }

  return (
    <DialogContent className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg bg-white min-w-[340px]">
      <DialogHeader className="w-full text-center mb-2">
        <DialogTitle className="text-2xl font-bold tracking-tight text-gray-800">
          Payment
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-gray-500 font-medium text-base mb-6 text-center">
        Choose your payment method below.
      </DialogDescription>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
        {!address && (
          <Button
            type="button"
            variant="request_ingredients"
            onClick={() => handleSubmit("CASH")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-all focus:ring-2 focus:ring-green-300 focus:outline-none w-full sm:w-auto"
            aria-label="Pay with Cash"
          >
            <IconCash size={22} />
            <span>Pay with Cash</span>
          </Button>
        )}
        <Button
          variant="ready_order"
          onClick={() => handleSubmit("DIGITAL")}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all focus:ring-2 focus:ring-blue-300 focus:outline-none w-full sm:w-auto"
          aria-label={isPosRoute ? "Generate Qr" : "Pay with Digital"}
        >
          <CardSim size={22} />
          {isPosRoute ? "Generate QR" : "Pay with Digital"}
        </Button>
      </div>

      <div className="mt-6 w-full flex justify-center">
        <DialogClose asChild>
          <button
            className="text-gray-400 hover:text-gray-600 text-sm underline transition-all"
            aria-label="Close Payment Modal"
          >
            Cancel
          </button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default PaymentModal;
