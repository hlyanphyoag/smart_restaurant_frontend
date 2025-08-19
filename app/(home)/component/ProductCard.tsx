import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface ProductCardProps {
  food: any;
  addToCart: (food: any) => void;
}

const ProductCard = ({ food, addToCart }: ProductCardProps) => {
  return (
    <Card className="w-full max-w-[300px]">
  <CardHeader>
    <img
      src={food.images[food.images.length - 1]}
      alt={food.name}
      className="h-36 w-full rounded-2xl object-cover"
    />
  </CardHeader>
  <CardContent>
    <CardTitle className="mb-2">{food.name}</CardTitle>
    <CardDescription>{food.description}</CardDescription>
  </CardContent>
  <CardFooter className="flex justify-between items-center">
    <p className="text-lg font-semibold text-green-500">{food.price} MMK</p>
    <CardAction>
      <Button
        variant="customize"
        disabled={food.availableQuantity === 0}
        className="w-full"
        onClick={() => addToCart(food)}
      >
        {food.availableQuantity === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </CardAction>
  </CardFooter>
</Card>

  );
};

export default ProductCard;
