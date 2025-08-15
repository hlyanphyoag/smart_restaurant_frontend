"use client";
import Lottie from "lottie-react";
import NoFoodItems from "./NoFoodItems";
import { Input } from "@/components/ui/input";
import {
  useGetFoodQuery,
  useGetPopularFood,
  useGetRecommendedFood,
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
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Food query
  const {
    data: foodData,
    isPending,
    isError: isFoodError,
  } = useGetFoodQuery(searchDebounce, currentPage.toString(), "10");

  // Popular food query
  const {
    data: mostOrderedFood,
    isPending: isPopularPending,
    isError: isPopularError,
  } = useGetPopularFood();

  // Recommended food query
  const {
    data: recommendedFood,
    isPending: isRecommendedPending,
    isError: isRecommendedError,
  } = useGetRecommendedFood();

  const { addToCart } = useCartStore();

  // Handle error states
  if (isFoodError || isPopularError || isRecommendedError) {
    return (
      <div className="text-red-500 p-4">
        Error loading food items. Please try again later.
      </div>
    );
  }

  // Combined loading state
  const isLoading = isPending || isPopularPending || isRecommendedPending;

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="flex justify-between">
        <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
          <div className="bg-green-400 h-full flex items-center justify-center px-4">
            <Search size={20} className="text-white" />
          </div>
          <Input
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="xs:w-50 sm:w-80 border-none focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="w-75 h-75 flex items-start justify-center">
          <Lottie
            animationData={require("@/public/loading.json")}
            loop={true}
            autoPlay={true}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Recommended and Popular Sections (hidden when searching) */}
          {!searchQuery && (
            <div className="flex flex-col gap-8">
              <ScrollCard
                title="Top Order Menu"
                items={mostOrderedFood || []}
                addToCart={addToCart}
                description="Explore our popular menu"
              />

              <ScrollCard
                title="Recommended Menu"
                items={recommendedFood || []}
                addToCart={addToCart}
                description="Discover our recommendations"
              />
            </div>
          )}

          {/* All Menu Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-600">All Menu</h2>
            <p className="text-md text-gray-600">Explore our full menu</p>
          </div>

          {/* Menu Items */}
          {foodData?.results.length === 0 ? (
            <NoFoodItems />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-10">
              {foodData?.results.map((food: Food) => (
                <ProductCard key={food.id} food={food} addToCart={addToCart} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {foodData && foodData.totalPages > 1 && (
            <Pagination
              totalPages={foodData.totalPages}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
