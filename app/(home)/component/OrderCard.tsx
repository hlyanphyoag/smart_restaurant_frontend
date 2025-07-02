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
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const OrderCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: foodData, isPending, isError } = useGetFoodQuery(searchQuery);

  const { addToCart } = useCartStore();


  console.log("FoodOrderCard:", foodData?.results);
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex justify-between">
          <div className="flex justify-center items-center border border-neutral-200 rounded-xl">
            <div className="bg-green-400 h-full flex items-center justify-center rounded-l-xl px-4">
            <Search size={20} className="text-white"/>
            </div>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="xs:w-50 sm:w-80 rounded-xl border-none"
            />
          </div>
        </div>
     {isPending ? <div className="w-75 h-75 flex items-start justify-center">
      <Lottie
        animationData={require("@/public/loading.json")}
        loop={true}
        autoPlay={true}
        size={20}
      />
     </div> : (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  w-full md:min-w-4xl mb-10">
       {foodData?.results.map((food: Food, index: number) => {
         return (
           <Card key={index} className="w-80 sm:w-60 md:w-70">
             <CardHeader className="">
               <img
                 src={food.images[0]}
                 alt={food.name}
                 className="h-35 w-full rounded-3xl"
               />
             </CardHeader>
             <CardContent className="h-18">
               <CardTitle className="mb-2">{food.name}</CardTitle>
               <CardDescription>{food.description}</CardDescription>
             </CardContent>
             <CardFooter className="flex justify-between">
               <p className="text-lg font-semibold text-green-500">$ {food.price}</p>
               <CardAction>
                 <Button variant='customize' className="w-full" onClick={() => addToCart(food)}>Add to Cart</Button>
               </CardAction>
             </CardFooter>
           </Card>
         );
       })}
     </div>
     )}
    </div>
  );
};

export default OrderCard;
