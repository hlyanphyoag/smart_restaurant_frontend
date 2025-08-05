import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import ProductCard from "./ProductCard";

interface ScrollCardProps {
  title: string;
  items: any;
  description: string;
  addToCart: (food: any) => void;
}

const ScrollCard = ({ title, items, description, addToCart }: ScrollCardProps) => {
  return (
    <div className="w-full space-y-2">
      <h2 className="text-2xl font-semibold text-gray-600">{title}</h2>
      <p className="text-md text-gray-600">{description}</p>

      <ScrollArea className="max-w-[280px] sm:max-w-[600px] lg:max-w-[880px] overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {items.map((item: any, index: number) => (
            <div key={index} className="min-w-[250px] sm:min-w-[270px] md:min-w-[300px]">
              <ProductCard food={item} addToCart={addToCart} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ScrollCard;
