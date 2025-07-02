import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStatusStore } from "@/store/StatusStore";
import { Check, CircleCheck, CookingPot, FireExtinguisher, MoveRight, Presentation, Receipt, Timer } from "lucide-react";
import React from "react";

const StatusCard = () => {
    const { setStatus } = useStatusStore();
  return (
    <div className="flex flex-row gap-x-6">
      <Card onClick={() => setStatus('')} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Total Order</p>
            <h2 className="text-lg font-semibold text-gray-600">156</h2>
          </div>
          <div className="flex items-center justify-center text-blue-400   rounded-2xl p-2 bg-blue-100">
            <Receipt size={20}/>
          </div>
        </CardContent>
      </Card>
      <Card onClick={() => setStatus('PENDING')} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Pending</p>
            <h2 className="text-lg font-semibold text-orange-300">24</h2>
          </div>
          <div className="flex items-center justify-center text-orange-300 bg-orange-100  rounded-2xl p-2">
            <Timer size={20} />
          </div>
        </CardContent>
      </Card>
      <Card onClick={() => setStatus('CONFIRMED')} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Preparing</p>
            <h2 className="text-lg font-semibold text-red-400">15</h2>
          </div>
          <div className="flex items-center justify-center text-red-400 bg-red-100 rounded-2xl p-2">
            <CookingPot size={20} />
          </div>
        </CardContent>
      </Card>
      <Card onClick={() => setStatus('COMPLETED')} className="cursor-pointer">
        <CardContent className="flex justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-gray-500 font-semibold">Completed</p>
            <h2 className="text-lg font-semibold text-green-400">100</h2>
          </div>
          <div className="flex items-center justify-center text-green-400 bg-green-100  rounded-2xl p-2">
            <CircleCheck size={20} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCard;
