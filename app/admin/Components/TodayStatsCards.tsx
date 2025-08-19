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
      value: `${todaySummary?.summary.income.total.toFixed(2) || "0.00"} MMK`,
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
      value: `${todaySummary?.summary.income.average.toFixed(2) || "0.00"}MMK`,
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
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
            Today's Performance
          </h2>
          <div className="px-3 py-1 bg-emerald-100 rounded-full">
            <span className="text-xs font-semibold text-emerald-700">LIVE</span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent flex-1 ml-6"></div>
      </div>
      {todayLoading ? (
        <DashBoardStatusSkeleton />
      ) : todayError ? (
        <DashBoardStatusError message={todayError?.message} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {todayStats.map((stat, index) => {
            const cardColors = [
              {
                gradient: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700",
                iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
                accent: "bg-emerald-500"
              },
              {
                gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
                iconBg: "bg-blue-50 text-blue-600 border-blue-200",
                accent: "bg-blue-500"
              },
              {
                gradient: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700", 
                iconBg: "bg-amber-50 text-amber-600 border-amber-200",
                accent: "bg-amber-500"
              },
              {
                gradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
                iconBg: "bg-purple-50 text-purple-600 border-purple-200", 
                accent: "bg-purple-500"
              }
            ];
            return (
              <Card
                key={index}
                className="group relative overflow-hidden backdrop-blur-sm bg-white/90 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className={`absolute inset-0 ${cardColors[index].gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className={`absolute top-0 left-0 right-0 h-1 ${cardColors[index].accent}`}></div>
                <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0 relative z-10">
                  <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors leading-tight">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-3 rounded-xl border-2 ${cardColors[index].iconBg} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 space-y-2">
                  <p className="text-3xl font-bold text-slate-900 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {stat.description}
                  </p>
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-semibold">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TodayStatsCards;
