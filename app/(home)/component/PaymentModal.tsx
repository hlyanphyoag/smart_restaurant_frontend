import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrderConfirmMutation } from "@/services/OrderServices/order.queryMutation";
import {
  usePaymentMethodMutation,
  useStripeInitiateMutation,
} from "@/services/StripeServices/bill.mutation";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PaymentModal = ({ orderId }: { orderId: string }) => {
  const { mutate: stripeMutation } = useStripeInitiateMutation();
  const { mutate: orderByCashierMutation } = useOrderConfirmMutation();
  const router = useRouter()
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const posRoute = usePathname();
  // console.log("posRoute:", posRoute)

  const handlePayWithStripe = () => {
    stripeMutation(orderId, {
      onSuccess: (StripeData) => {
        console.log("StripeSuccess:", StripeData.url);
        window.location.href = StripeData.url;
        return;
      },
      onError: (error) => {
        console.log("StripeError_really:", error);
      },
    });
  };

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
    <DialogContent className="flex flex-col items-center justify-center">
      <DialogHeader>
        <DialogTitle>Payment</DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-gray-600 font-semibold text-lg">
        Choose your payment method.
      </DialogDescription>
      <div className="flex justity-center items-center gap-x-4">
          {!address && <Button type="button" variant="request_ingredients" onClick={() => {
            
            if(posRoute === "/cashier/pos"){
              router.push("/cashier")
            }

            router.push(`/success/${orderId}`)
          }}>Pay with Cash</Button>}
        <Button variant="ready_order" onClick={handlePayWithStripe}>
          {posRoute === "/cashier/pos" ? "Generate Qr" : "Pay with Digital"}
        </Button>
      </div>
    </DialogContent>
  );
};

export default PaymentModal;
