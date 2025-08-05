"use client";

import { useTableQuery } from "@/services/TableServices/table.query";
import { Armchair, CheckCircle, Divide, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";

const Page = () => {
  const { data: table, isPending, isError } = useTableQuery();

  if (isPending) return <div className="w-75 h-75 flex items-start justify-center">
    <Lottie
        animationData={require("@/public/loading.json")}
        loop={true}
        autoPlay={true}
        className="w-4 h-4"
      />
  </div>;
  if (isError)
    return (
      <div className="text-center text-xl text-red-500">
        Error fetching data
      </div>
    );

  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-8 px-4 sm:px-8 lg:px-16 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {table?.results.map((table: any, index: number) => (
          <Card
            key={index}
            className={`w-60 h-70 flex flex-col justify-between cursor ${
              table.occupied && "opacity-50"
            }`}
          >
            <CardHeader className="flex items-center justify-between">
              <div
                className={`text-sm ${
                  table.occupied ? "text-red-500" : "text-green-500"
                }`}
              >
                {table.occupied ? (
                  <div className="flex">
                    <XCircle className="text-red-500 mr-1" size={18} />
                    Occupied
                  </div>
                ) : (
                  <div className="flex">
                    <CheckCircle className="text-green-500 mr-1" size={18} />
                    Available
                  </div>
                )}
              </div>
              <CardTitle className="text-sm">
                Table No. {table.number}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-sm">
              <div className="flex items-center justify-center bg-neutral-100 p-6 rounded-full">
                <Armchair size={28} />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-y-2">
              <div className="flex justify-between w-full p-2">
                <p className="text-gray-400">Capacity: </p>
                <p className="text-sm text-gray-400">{table.seats} people</p>
              </div>
              <CardAction className="w-full">
                <Link href={`/cashier/pos/order/${table.id}`}>
                  <Button
                    variant="customize"
                    disabled={table.occupied}
                    className="w-full"
                  >
                    Book Table
                  </Button>
                </Link>
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
