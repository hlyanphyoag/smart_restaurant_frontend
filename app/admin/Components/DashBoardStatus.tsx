"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/services/api";
import { DashboardSummary } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import { BoxesIcon, ClipboardListIcon, UsersIcon } from "lucide-react";
import React from "react";

function DashBoardStatusError({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="text-red-500 text-lg font-semibold mb-2">
        Error loading dashboard status
      </div>
      <div className="text-gray-500 text-sm">
        {message || "Something went wrong. Please try again later."}
      </div>
    </div>
  );
}

export function DashBoardStatusSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(3)].map((_, idx) => (
        <Card
          key={idx}
          className="shadow-md hover:shadow-lg transition-all rounded-xl"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-10 w-10 rounded-full bg-green-100" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const DashBoardStatus = () => {
  const adminStatus = [
    {
      key: "totalCustomers",
      icon: UsersIcon,
      text: "Total Customers",
      count: 0,
    },
    {
      key: "totalFoodItems",
      icon: BoxesIcon,
      text: "Total Food",
      count: 0,
    },
    {
      key: "totalOrders",
      icon: ClipboardListIcon,
      text: "Total Completed Orders",
      count: 0,
    },
  ];

  const {
    data: summary,
    isLoading,
    error,
  } = useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await api.get<DashboardSummary>("/api/dashboard/summary");
      return res.data;
    },
  });

  console.log(summary);

  return (
    <div>
      {isLoading ? (
        <DashBoardStatusSkeleton />
      ) : error ? (
        <DashBoardStatusError message={error?.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
          {adminStatus.map((item, index) => {
            const count = summary![item.key as keyof DashboardSummary] || 0;
            return (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-all"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-md font-medium text-gray-600">
                    {item.text}
                  </CardTitle>
                  <div className="p-2 rounded-full bg-green-100 text-green-400">
                    <item.icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashBoardStatus;
