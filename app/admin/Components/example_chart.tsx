"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetMostOrderFoodQueryFn } from "@/services/foodServices/food.queryFn"
import { useGetMostOrderedFoodQuery } from "@/services/foodServices/food.query"
import { SkeletonCard } from "@/components/SkeletonCard"

export const description = "A bar chart"

export function ChartBarDefault() {
  const {data: mostOrderedFood, isPending, isError } = useGetMostOrderedFoodQuery('10')

  const chartData = mostOrderedFood?.results.map((item : any) => {
    return {
      foodName: item.foodItem.name,
      quantity: item.totalOrdered
    }
  })
  
  const chartConfig = {
    foodName: {
      label: "foodName",
      color: "var(--chart-1)",
    },
    quantity: {
      label: "TotalOrdered",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  if(isPending) return <SkeletonCard />
  if(isError) return <div>Error...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Ordered Foods</CardTitle>
        <CardDescription>Top Food Items by order count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="foodName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="quantity" fill="var(--color-quantity)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top 8 most ordered menu items
        </div>
      </CardFooter>
    </Card>
  )
}
