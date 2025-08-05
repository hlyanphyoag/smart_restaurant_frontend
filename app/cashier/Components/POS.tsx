"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetFoodQuery } from "@/services/foodServices/food.query";
import { useCartStore } from "@/store/CartStore";
import { Food } from "@/types/food";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

const PosCard = ({ searchQuery }: { searchQuery: string }) => {
  const {
    data: foodData,
    isPending,
    isError,
  } = useGetFoodQuery(searchQuery, "", "");

  const { addToCart } = useCartStore();

  console.log("FoodOrderCard:", foodData?.results);
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center justify-start gap-6 p-4">
      {isPending ? (
        <div className="w-75 h-75 flex items-start justify-center">
          <Lottie
            animationData={require("@/public/loading.json")}
            loop={true}
            autoPlay={true}
            size={20}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  w-full md:min-w-3xl mb-10">
          {foodData?.results.map((food: Food, index: number) => {
            return (
              <div key={index}>
                <Card>
                  <CardContent className="flex gap-x-2">
                    <img
                      src={food.images[food.images.length - 1]}
                      alt={food.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <CardTitle className="text-sm font-semibold text-gray-600">
                        {food.name}
                      </CardTitle>
                      <CardDescription className="text-md font-semibold text-green-400">${food.price}</CardDescription>
                    </div>
                   
                  </CardContent>
                  <CardFooter>
                  <Button
                      onClick={() => addToCart(food)}
                      variant="customize"
                      size="sm"
                      className="text-xs w-full"
                    >
                      <Plus />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PosCard;
