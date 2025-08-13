import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DashBoardStatusSkeleton,
  DashBoardStatusError,
} from "./DashBoardPageUtils";
import { DollarSign, ClipboardListIcon, Utensils, Clock } from "lucide-react";
import React from "react";

interface Props {
  todayLoading: boolean;
  todayError: any;
  todaySummary: any;
}

const TodayStatsCards: React.FC<Props> = ({
  todayLoading,
  todayError,
  todaySummary,
}) => {
  const todayStats = [
    {
      title: "Today's Revenue",
      value: `$${todaySummary?.summary.income.total.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      description: "Total income for today",
      change: "+12% from yesterday",
    },
    {
      title: "Completed Orders",
      value: todaySummary?.summary.completedOrders || 0,
      icon: ClipboardListIcon,
      description: "Orders completed today",
      change: "+5% from yesterday",
    },
    {
      title: "Average Order Value",
      value: `$${todaySummary?.summary.income.average.toFixed(2) || "0.00"}`,
      icon: Utensils,
      description: "Average spend per order",
      change: "+3% from yesterday",
    },
    {
      title: "Completion Rate",
      value: `${todaySummary?.summary.completionRate || 0}%`,
      icon: Clock,
      description: "Orders completed successfully",
      change: "+2% from yesterday",
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Today's Performance</h2>
      {todayLoading ? (
        <DashBoardStatusSkeleton />
      ) : todayError ? (
        <DashBoardStatusError message={todayError?.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {todayStats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-green-100 text-green-500">
                  <stat.icon className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default TodayStatsCards;
