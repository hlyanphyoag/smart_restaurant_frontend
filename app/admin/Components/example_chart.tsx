"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { useGetMostOrderedFoodQuery } from "@/services/foodServices/food.query";
import { SkeletonCard } from "@/components/SkeletonCard";

export const description = "A bar chart";

export function ChartBarDefault() {
  const {
    data: mostOrderedFood,
    isPending,
    isError,
  } = useGetMostOrderedFoodQuery("10");

  const chartData = mostOrderedFood?.map((item: any) => {
    return {
      foodName: item.name,
      quantity: item.orderedCount,
    };
  });

  console.log("Chart Data", chartData);

  const chartConfig = {
    foodName: {
      label: "food Name",
      color: "var(--chart-1)",
    },
    quantity: {
      label: "Ordered Count",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  if (isPending) return <SkeletonCard />;
  if (isError) return <div>Error...</div>;

  if (chartData)
    return (
      <Card className="shadow-xl rounded-xl border-none bg-gradient-to-br from-white via-slate-50 to-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-primary">
            <TrendingUp className="h-6 w-6 text-orange-500 animate-bounce" />
            Most Ordered Foods
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            Top Food Items by order count
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[240px]">
            <BarChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#fde68a" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="foodName"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fontSize: 12, fill: "#64748b", fontWeight: 500 }}
                tickFormatter={(value) => `${value.slice(0, 8)}...`}
              />
              <ChartTooltip
                cursor={{ fill: "rgba(251,191,36,0.1)" }}
                content={<ChartTooltipContent hideLabel={false} />} // show label
              />
              <Bar
                dataKey="quantity"
                fill="url(#barGradient)"
                radius={[12, 12, 0, 0]}
                isAnimationActive={true}
                barSize={32}
                className="transition-all duration-300 hover:scale-105"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="text-orange-600 font-medium">
            Showing top {chartData.length} most ordered menu items
          </div>
        </CardFooter>
      </Card>
    );
}
