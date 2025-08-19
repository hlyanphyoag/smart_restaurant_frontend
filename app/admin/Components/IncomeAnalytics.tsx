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
      value: `${incomeData?.today.toFixed(2) || "0.00"} MMK`,
      icon: Calendar,
      description: "Income today",
    },
    {
      title: "This Month",
      value: `${incomeData?.month.toFixed(2) || "0.00"} MMK`,
      icon: Calendar,
      description: "Income this month",
    },
    {
      title: "This Year",
      value: `${incomeData?.year.toFixed(2) || "0.00"} MMK`,
      icon: Calendar,
      description: "Income this year",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl"></div>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-8 rounded-2xl border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
            Income Analytics
          </h3>
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Calendar className="h-5 w-5 text-emerald-600" />
          </div>
        </div>
        
        {incomeLoading ? (
          <DashBoardStatusSkeleton />
        ) : incomeError ? (
          <DashBoardStatusError message={incomeError?.message} />
        ) : (
          <div className="space-y-4">
            {incomeStats.map((stat, index) => {
              const progressColors = [
                "bg-emerald-500",
                "bg-teal-500", 
                "bg-cyan-500"
              ];
              const bgColors = [
                "bg-emerald-50 border-emerald-200",
                "bg-teal-50 border-teal-200",
                "bg-cyan-50 border-cyan-200"
              ];
              return (
                <div key={index} className={`p-4 rounded-xl border-2 ${bgColors[index]} backdrop-blur-sm hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 ${progressColors[index]} rounded-full animate-pulse`}></div>
                      <div>
                        <h4 className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                          {stat.title}
                        </h4>
                        <p className="text-xs text-slate-500">{stat.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 group-hover:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 ${progressColors[index]} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${Math.min((parseFloat(stat.value.replace('$', '').replace(',', '')) / 10000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeAnalytics;
