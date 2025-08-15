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
      <Card className="shadow-sm rounded-xl border border-slate-200/50 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <TrendingUp className="h-5 w-5 text-slate-500" />
            Most Ordered Foods
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm">
            Top performing menu items by order count
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
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
                dataKey="foodName"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(value) => value.slice(0, 8)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  hideLabel 
                  className="rounded-lg border border-slate-200 bg-white/95 shadow-lg"
                />}
              />
              <Bar 
                dataKey="quantity" 
                fill="#7dd3fc"
                radius={[4, 4, 0, 0]}
                className="fill-sky-300 opacity-80 hover:opacity-100 transition-opacity"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none text-slate-600">
            Trending up by 12% this month 
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-slate-500">
            Showing top {chartData.length} most ordered menu items
          </div>
        </CardFooter>
      </Card>
    );
}
