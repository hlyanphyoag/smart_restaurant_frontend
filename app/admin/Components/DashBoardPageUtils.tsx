import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashBoardStatusError({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="text-red-500 text-lg font-semibold mb-2">
        Error loading dashboard status
      </div>
      <div className="text-gray-500 text-sm">
        {message || "Something went wrong. Please try again later."}
      </div>
    </div>
  );
}

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
