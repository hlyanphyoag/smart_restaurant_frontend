import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { adminStatus } from "@/constants";
  import React from "react";
  
  const DashBoardStatus = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
        {adminStatus.map((item, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-md font-medium text-gray-600">
                {item.text}
              </CardTitle>
              <div className="p-2 rounded-full bg-green-100 text-green-400">
                <item.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{item.count}</p>
              <p className="text-xs text-muted-foreground">Total {item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  export default DashBoardStatus;
  