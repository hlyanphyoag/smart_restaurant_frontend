import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllOrdersCount } from "@/services/OrderServices/order.query";
import { useGetStockRequestCountQuery } from "@/services/StockServices/stock.query";
import { useStatusStore } from "@/store/StatusStore";
import {
  Check,
  CheckCircle2,
  CircleCheck,
  CookingPot,
  FireExtinguisher,
  List,
  ListCollapse,
  ListOrdered,
  MoveRight,
  Paperclip,
  PartyPopper,
  Presentation,
  Receipt,
  Timer,
  X,
} from "lucide-react";
import React from "react";

const HolderStatusCard = () => {
  const { setStatus } = useStatusStore();
  const {
    data: orderCount,
    isPending,
    isError,
  } = useGetStockRequestCountQuery();

  return (
    <div className="flex flex-row gap-x-6">
      <Card onClick={() => setStatus("")} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Total Requests</p>
            <h2 className="text-lg font-semibold text-blue-400">
              {orderCount?.total}
            </h2>
          </div>
          <div className="flex items-center justify-center text-blue-400   rounded-2xl p-2 bg-blue-100">
            <ListOrdered size={20} />
          </div>
        </CardContent>
      </Card>
      <Card onClick={() => setStatus("PENDING")} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Pending</p>
            <h2 className="text-lg font-semibold text-orange-300">
              {orderCount?.pending}
            </h2>
          </div>
          <div className="flex items-center justify-center text-orange-300 bg-orange-100  rounded-2xl p-2">
            <Timer size={20} />
          </div>
        </CardContent>
      </Card>
      <Card onClick={() => setStatus("APPROVED")} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Approved</p>
            <h2 className="text-lg font-semibold text-red-400">
              {orderCount?.approved}
            </h2>
          </div>
          <div className="flex items-center justify-center text-red-400 bg-red-100 rounded-2xl p-2">
            <CheckCircle2 size={20} />
          </div>
        </CardContent>
      </Card>
      <Card onClick={() => setStatus("REJECTED")} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Rejected</p>
            <h2 className="text-lg font-semibold text-green-400">
              {orderCount?.rejected}
            </h2>
          </div>
          <div className="flex items-center justify-center text-green-400 bg-green-100  rounded-2xl p-2">
            <X size={20} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolderStatusCard;
