"use client";
import React from "react";
import { FoodForm } from "../../Components/FoodForm";
import { foodSchema } from "@/lib/validations";
import { useAddFoodMutation } from "@/services/foodServices/food.mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const {
    mutate: addFoodItemMutation,
    isPending,
    isError,
  } = useAddFoodMutation();
  const defaultValues = {
    name: "",
    description: "",
    price: 0,
    images: [],
    ingredients: [] as {
      name: string;
      id: string;
      quantity: number;
    }[],
  };
  const onSubmit = (
    data: any
  ): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      addFoodItemMutation(
        {
          name: data.name,
          description: data.description,
          price: data.price,
          images: data.images,
          ingredients: data.ingredients.map((ingredient: any) => ({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
          })),
        },
        {
          onSuccess: (res) => {
            console.log("APIResponseForCreateFood:", res);
            router.back();
            toast.success("Food Item Created Successfully");
            resolve({ success: true });
          },
          onError: (err) => {
            console.log("APIErrorForCreateFood:", err);
            toast.error("Food Item Created Failed");
            resolve({ success: false, error: "Food Item Created Failed" });
          },
        }
      );
    });
  };
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold mb-6">Create New Menu</h2>
      </div>
      <FoodForm
        schema={foodSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default page;
