import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DashBoardStatusSkeleton,
  DashBoardStatusError,
} from "./DashBoardPageUtils";
import { UsersIcon, BoxesIcon, ClipboardListIcon } from "lucide-react";
import React from "react";

interface Props {
  summaryLoading: boolean;
  summaryError: any;
  summary: any;
}

const DashboardSummaryCards: React.FC<Props> = ({
  summaryLoading,
  summaryError,
  summary,
}) => {
  const adminStatus = [
    {
      key: "totalCustomers",
      icon: UsersIcon,
      text: "Total Customers",
      count: summary?.totalCustomers || 0,
    },
    {
      key: "totalFoodItems",
      icon: BoxesIcon,
      text: "Total Menu Items",
      count: summary?.totalFoodItems || 0,
    },
    {
      key: "totalOrders",
      icon: ClipboardListIcon,
      text: "Total Orders",
      count: summary?.totalOrders || 0,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Business Summary
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1 ml-6"></div>
      </div>
      {summaryLoading ? (
        <DashBoardStatusSkeleton />
      ) : summaryError ? (
        <DashBoardStatusError message={summaryError?.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {adminStatus.map((item, index) => {
            const gradients = [
              "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
              "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700", 
              "bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700"
            ];
            const iconBgs = [
              "bg-blue-50 text-blue-600 border-blue-200",
              "bg-emerald-50 text-emerald-600 border-emerald-200",
              "bg-violet-50 text-violet-600 border-violet-200"
            ];
            return (
              <Card
                key={index}
                className="group relative overflow-hidden backdrop-blur-sm bg-white/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`absolute inset-0 ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0 relative z-10">
                  <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                    {item.text}
                  </CardTitle>
                  <div className={`p-3 rounded-xl border-2 ${iconBgs[index]} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-3xl font-bold text-slate-900 mb-1 group-hover:scale-105 transition-transform duration-300">
                    {item.count.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    All time total
                  </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default DashboardSummaryCards;
