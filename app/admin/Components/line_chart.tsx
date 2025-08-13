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
      <Card className="shadow-xl rounded-xl border-none bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-primary">
            <TrendingUp className="h-6 w-6 text-green-500 animate-bounce" />
            Completed Orders in 7 Days
          </CardTitle>
          {data.length >= 2 && (
            <CardDescription className="text-muted-foreground text-xs">
              {format(new Date(fromDate), "MMM dd, yyyy")} to{" "}
              {format(new Date(toDate), "MMM dd, yyyy")}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[240px]">
            <LineChart
              data={data}
              margin={{ left: 12, right: 12, top: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f8cff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#a0e9ff" stopOpacity={0.2} />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f8cff" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#a0e9ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
                tickFormatter={(value) => `${value.slice(0, 5)}...`}
              />
              <ChartTooltip
                cursor={{
                  stroke: "#4f8cff",
                  strokeWidth: 1,
                  strokeDasharray: "4 2",
                }}
                content={<ChartTooltipContent hideLabel={false} />} // show label
              />
              <Line
                dataKey="count"
                type="monotone"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: "#4f8cff",
                  strokeWidth: 2,
                  fill: "#fff",
                  className: "transition-all duration-300 hover:scale-110",
                }}
                activeDot={{
                  r: 7,
                  fill: "#4f8cff",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                isAnimationActive={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium text-green-600">
            Trending up by 5.2% this week{" "}
            <TrendingUp className="h-4 w-4 animate-pulse" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing completed orders for the last 7 days
          </div>
        </CardFooter>
      </Card>
    );
  }
}
