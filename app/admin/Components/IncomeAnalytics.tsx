import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DashBoardStatusSkeleton,
  DashBoardStatusError,
} from "./DashBoardPageUtils";
import { Calendar } from "lucide-react";
import React from "react";

interface Props {
  incomeLoading: boolean;
  incomeError: any;
  incomeData: any;
}

const IncomeAnalytics: React.FC<Props> = ({
  incomeLoading,
  incomeError,
  incomeData,
}) => {
  const incomeStats = [
    {
      title: "Today",
      value: `$${incomeData?.today.toFixed(2) || "0.00"}`,
      icon: Calendar,
      description: "Income today",
    },
    {
      title: "This Month",
      value: `$${incomeData?.month.toFixed(2) || "0.00"}`,
      icon: Calendar,
      description: "Income this month",
    },
    {
      title: "This Year",
      value: `$${incomeData?.year.toFixed(2) || "0.00"}`,
      icon: Calendar,
      description: "Income this year",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Income Analytics</h3>
      {incomeLoading ? (
        <DashBoardStatusSkeleton />
      ) : incomeError ? (
        <DashBoardStatusError message={incomeError?.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {incomeStats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomeAnalytics;
