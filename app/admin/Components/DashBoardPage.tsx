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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <DashboardSummaryCards
        summaryLoading={summaryLoading}
        summaryError={summaryError}
        summary={summary}
      />
      <TodayStatsCards
        todayLoading={todayLoading}
        todayError={todayError}
        todaySummary={todaySummary}
      />
      <div className="flex gap-x-4  mt-6 mb-6">
        <ChartLineDefault />
        <ChartBarDefault />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </section>
      {todaySummary?.summary?.popularItems &&
        todaySummary.summary.popularItems.length > 0 && (
          <PopularItemsToday popularItems={todaySummary.summary.popularItems} />
        )}
    </div>
  );
};

export default DashboardPage;
