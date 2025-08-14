"use client";
import Lottie from "lottie-react";
import NoFoodItems from "./NoFoodItems";
import { Input } from "@/components/ui/input";
import {
  useGetFoodQuery,
  useGetPopularFood,
} from "@/services/foodServices/food.query";
import { useCartStore } from "@/store/CartStore";
import { Food } from "@/types/food";
import { Search } from "lucide-react";
import React, { useState } from "react";
import ScrollCard from "./ScrollCard";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

const OrderCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounce = useDebounce(searchQuery, 500);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")!) || 1;
  const {
    data: foodData,
    isPending,
    isError,
  } = useGetFoodQuery(searchDebounce, currentPage.toString(), "10");

  const {
    data: mostOrderedFood,
    isPending: isPopularPending,
    isError: isPopularError,
  } = useGetPopularFood();
  console.log("mostOrderedFood:", mostOrderedFood);

  const { addToCart } = useCartStore();
  console.log("FoodOrderCard:", foodData?.results);
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col  gap-6">
      <div className="flex justify-between">
        <div className="flex justify-center items-center border border-neutral-200 rounded-xl">
          <div className="bg-green-400 h-full flex items-center justify-center rounded-l-xl px-4">
            <Search size={20} className="text-white" />
          </div>
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="xs:w-50 sm:w-80 rounded-xl border-none"
          />
        </div>
      </div>
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
        <div className="flex flex-col gap-8">
          {!searchQuery && !isPopularPending && !isPopularError && (
            <div className="flex flex-col gap-8">
              <ScrollCard
                title="Top Order Menu"
                items={mostOrderedFood!}
                addToCart={addToCart}
                description="Explore our popular menu"
              />

              <ScrollCard
                title="Recommended Menu"
                items={mostOrderedFood!}
                addToCart={addToCart}
                description="Explore our popular menu"
              />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold text-gray-600">All Menu</h2>
            <p className="text-md text-gray-600">Explore our all menu</p>
          </div>
          {foodData?.results.length === 0 ? (
            <NoFoodItems />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  w-full xl:min-w-4xl mb-10">
              {foodData?.results.map((food: Food, index: number) => {
                return (
                  <ProductCard key={index} food={food} addToCart={addToCart} />
                );
              })}
            </div>
          )}

          <Pagination
            totalPages={foodData.totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCard;
