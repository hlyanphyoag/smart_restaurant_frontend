import React from "react";
import { Pie, PieChart, Cell } from "recharts";
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
import { Skeleton } from "@/components/ui/skeleton";

const chartData = [
  { browser: "cash", visitors: 0, fill: "var(--color-cash)" },
  { browser: "digital", visitors: 0, fill: "var(--color-digital)" },
];

const chartConfig = {
  visitors: {
    label: "Transactions",
  },
  cash: {
    label: "Cash",
    color: "#7dd3fc",
  },
  digital: {
    label: "Digital", 
    color: "#0ea5e9",
  },
} satisfies ChartConfig;

interface Props {
  paymentLoading: boolean;
  paymentError: any;
  paymentData: any;
}

const PaymentAnalytics: React.FC<Props> = ({
  paymentLoading,
  paymentError,
  paymentData,
}) => {
  // Update chart data with actual values
  const updatedChartData = [
    { browser: "cash", visitors: paymentData?.cash || 0, fill: "var(--color-cash)" },
    { browser: "digital", visitors: paymentData?.digital || 0, fill: "var(--color-digital)" },
  ];

  const total = updatedChartData.reduce((sum, item) => sum + item.visitors, 0);

  return (
    <Card className="shadow-sm rounded-xl border border-slate-200/50 bg-white/70 backdrop-blur-sm">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-semibold text-slate-700">Payment Methods</CardTitle>
        <CardDescription className="text-slate-500 text-sm">
          Transaction breakdown by payment type
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {paymentLoading ? (
          <div className="flex items-center justify-center h-64">
            <Skeleton className="h-[250px] w-[250px] rounded-full" />
          </div>
        ) : paymentError ? (
          <div className="flex items-center justify-center h-64 text-red-500">
            <div className="text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="font-medium">Error loading payment data</div>
            </div>
          </div>
        ) : total === 0 ? (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <div className="font-medium">No payment data available</div>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={updatedChartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Cell key="cash" fill="#7dd3fc" />
                <Cell key="digital" fill="#0ea5e9" />
              </Pie>

            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-slate-600">
          Payment analytics overview
        </div>
        <div className="leading-none text-slate-500">
          Showing payment method distribution
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentAnalytics;
