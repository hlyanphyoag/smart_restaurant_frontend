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
    <section>
      <h2 className="text-xl font-semibold mb-4">Business Summary</h2>
      {summaryLoading ? (
        <DashBoardStatusSkeleton />
      ) : summaryError ? (
        <DashBoardStatusError message={summaryError?.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adminStatus.map((item, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {item.text}
                </CardTitle>
                <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                  <item.icon className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardSummaryCards;
