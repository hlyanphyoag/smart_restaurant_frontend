import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Pie, PieChart, Tooltip, Legend, Cell } from "recharts";

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
  const paymentChartData = [
    {
      name: "Cash",
      value: paymentData?.cash || 0,
      fill: "#4f8cff",
    },
    {
      name: "Digital",
      value: paymentData?.digital || 0,
      fill: "#fbbf24",
    },
  ];

  const total = paymentChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
      {paymentLoading ? (
        <Skeleton className="h-[200px] w-full rounded" />
      ) : paymentError ? (
        <div className="text-red-500">Error loading payment data</div>
      ) : total === 0 ? (
        <div className="text-gray-500">No payment data available</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 h-64">
            <PieChart width={450} height={290}>
              <Pie
                data={paymentChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent! * 100).toFixed(0)}%)`
                }
              >
                {paymentChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAnalytics;
