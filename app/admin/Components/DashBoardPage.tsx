// import React from "react";
// import DashBoardStatus from "./DashBoardStatus";
// import { ChartPieDonutText } from "./chart_pie";
// import { ChartLineDefault } from "./line_chart";
// import { ChartBarDefault } from "./example_chart";

// const DashBoardPage = () => {
//   return (
//     <div>
//       <DashBoardStatus />
//       <div className="flex gap-x-4  mt-6 mb-6">
//         <ChartLineDefault />
//         <ChartBarDefault />
//       </div>
//       <ChartPieDonutText />
//     </div>
//   );
// };

// export default DashBoardPage;

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/services/api";
import {
  DashboardSummary,
  PaymentMethodAnalytics,
  TodaySummary,
} from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DashboardSummaryCards from "./DashboardSummaryCards";
import TodayStatsCards from "./TodayStatsCards";
import IncomeAnalytics from "./IncomeAnalytics";
import PaymentAnalytics from "./PaymentAnalytics";
import PopularItemsToday from "./PopularItemsToday";
import { ChartBarDefault } from "./example_chart";
import { ChartLineDefault } from "./line_chart";

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

const DashboardPage = () => {
  // Fetch all dashboard data
  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await api.get<DashboardSummary>("/api/dashboard/summary");
      return res.data;
    },
  });

  const {
    data: todaySummary,
    isLoading: todayLoading,
    error: todayError,
  } = useQuery<TodaySummary>({
    queryKey: ["today-summary"],
    queryFn: async () => {
      const res = await api.get<TodaySummary>("/api/dashboard/today-summary");
      return res.data;
    },
  });

  const {
    data: incomeData,
    isLoading: incomeLoading,
    error: incomeError,
  } = useQuery({
    queryKey: ["income-analytics"],
    queryFn: async () => {
      const res = await api.get("/api/dashboard/income-analytics");
      return res.data;
    },
  });

  const {
    data: paymentData,
    isLoading: paymentLoading,
    error: paymentError,
  } = useQuery<PaymentMethodAnalytics>({
    queryKey: ["payment-method"],
    queryFn: async () => {
      const res = await api.get<PaymentMethodAnalytics>(
        "/api/dashboard/payment-method"
      );
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Monitor your restaurant's performance in real-time
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600 font-medium">Live Updates</span>
          </div>
        </div>

        {/* Summary Cards */}
        <DashboardSummaryCards
          summaryLoading={summaryLoading}
          summaryError={summaryError}
          summary={summary}
        />

        {/* Today's Stats */}
        <TodayStatsCards
          todayLoading={todayLoading}
          todayError={todayError}
          todaySummary={todaySummary}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartLineDefault />
          <ChartBarDefault />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IncomeAnalytics
            incomeLoading={incomeLoading}
            incomeError={incomeError}
            incomeData={incomeData}
          />
          <PaymentAnalytics
            paymentLoading={paymentLoading}
            paymentError={paymentError}
            paymentData={paymentData}
          />
        </div>

        {/* Popular Items */}
        {todaySummary?.summary?.popularItems &&
          todaySummary.summary.popularItems.length > 0 && (
            <div className="backdrop-blur-sm bg-white/30 rounded-2xl border border-white/20 shadow-xl">
              <PopularItemsToday popularItems={todaySummary.summary.popularItems} />
            </div>
          )}
      </div>
    </div>
  );
};

export default DashboardPage;
