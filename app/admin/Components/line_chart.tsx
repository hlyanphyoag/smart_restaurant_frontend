"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { MostOrdered7Days } from "@/types/admin";
import { api } from "@/services/api";
import { SkeletonCard } from "@/components/SkeletonCard";
import { format } from "date-fns";

export const description = "A line chart";

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartConfig = {
  day: {
    label: "Count",
    color: "var(--chart-1)",
  },

  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineDefault() {
  const { data, isLoading, error } = useQuery<MostOrdered7Days>({
    queryKey: ["completed-orders-7days"],
    queryFn: async () => {
      const res = await api.get("/api/dashboard/completed-orders-by7days");
      return res.data;
    },
  });

  if (isLoading) return <SkeletonCard />;
  if (error) return <div>Error...</div>;

  if (data) {
    const fromDate = data[0].date;
    const toDate = data[data.length - 1].date;

    return (
      <Card className="shadow-sm rounded-xl border border-slate-200/50 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <TrendingUp className="h-5 w-5 text-slate-500" />
            Completed Orders - 7 Days
          </CardTitle>
          {data.length >= 2 && (
            <CardDescription className="text-slate-500 text-sm">
              {format(new Date(fromDate), "MMM dd, yyyy")} to{" "}
              {format(new Date(toDate), "MMM dd, yyyy")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                left: 12,
                right: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid 
                vertical={false} 
                strokeOpacity={0.2}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  hideLabel 
                  className="rounded-lg border border-slate-200 bg-white/95 shadow-lg"
                />}
              />
              <Line
                dataKey="count"
                type="monotone"
                stroke="#7dd3fc"
                strokeWidth={2}
                dot={{
                  fill: "#7dd3fc",
                  r: 3,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 4,
                  fill: "#0ea5e9",
                  strokeWidth: 0,
                }}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none text-slate-600">
            Trending up by 5.2% this week{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-slate-500">
            Showing completed orders for the last 7 days
          </div>
        </CardFooter>
      </Card>
    );
  }
}
