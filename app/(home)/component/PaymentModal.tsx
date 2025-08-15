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
import React from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
  const { mutate: postOrder } = useOrderMutation();

  const handleSubmit = (paymentMethod: PaymentMethod) => {
    postOrder(
      {
        tableId: tableId as string,
        customerId: authUser?.id!,
        payment_method: paymentMethod,
        totalCost: Number(GrandTotalPrice()),
        orderItems: cart?.map((item: any) => ({
          foodItemId: item.id,
          quantity: item.quantity,
          note: item.note,
        })),
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
        },
        onError: (error) => {
          toast.error("Failed to place order. Please try again.");
        },
      }
    );
  };

  return (
    <DialogContent className="p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-lg shadow-xl max-w-md w-full border border-gray-100/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-800 tracking-tight">
            Complete Your Payment
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm mt-2">
            Select a payment method to finalize your order.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          {!address && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                type="button"
                variant="request_ingredients"
                onClick={() => handleSubmit("CASH")}
                className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium shadow-lg transition-all duration-300 ease-in-out"
                aria-label="Pay with Cash"
              >
                <IconCash size={24} />
                <span>Pay with Cash</span>
              </Button>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="ready_order"
              onClick={() => handleSubmit("DIGITAL")}
              className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-lg transition-all duration-300 ease-in-out"
              aria-label={isPosRoute ? "Generate QR" : "Pay with Digital"}
            >
              <CardSim size={24} />
              {isPosRoute ? "Generate QR" : "Pay with Digital"}
            </Button>
          </motion.div>
        </div>

        <div className="mt-6 flex justify-center">
          <DialogClose asChild>
            <motion.button
              whileHover={{ color: "#1f2937" }}
              className="text-gray-400 text-sm font-medium underline hover:text-gray-600 transition-colors duration-200"
              aria-label="Close Payment Modal"
            >
              Cancel
            </motion.button>
          </DialogClose>
        </div>
      </motion.div>
    </DialogContent>
  );
};

export default PaymentModal;