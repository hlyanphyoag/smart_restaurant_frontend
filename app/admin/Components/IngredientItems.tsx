"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIngredientsQuery } from "@/services/IngredientsSevices/ingredients.query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIngrdientStore } from "@/store/IngredientStore";
import { Badge } from "@/components/ui/badge";

export function IngredientItems() {
  const { ingredients, setIngredients } = useIngrdientStore();
  const [ingredientsData, setIngredientsData] = React.useState({
    id: "",
    name: "",
    quantity: "",
  });
  const { data: allIngredients, isPending, isError } = useIngredientsQuery();
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Select
          value={ingredientsData.id || ""}
          onValueChange={(value) => {
            const selected = allIngredients?.results?.find(
              (item: any) => item.id === value
            );
            if (selected) {
              setIngredientsData({
                id: selected.id,
                name: selected.name,
                quantity: selected.quantity,
              });
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a ingredient..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ingredients</SelectLabel>
              {allIngredients?.results?.map((item: any) => {
                return (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Quantity..."
          value={ingredientsData.quantity ?? ""}
          onChange={(e) =>{
            setIngredientsData({
              ...ingredientsData,
              quantity: e.target.value,
            })
          } 
        }
        />
        <Button
          type="button"
          onClick={() => {
            setIngredients({...ingredientsData, quantity: Number(ingredientsData.quantity)});
            setIngredientsData({
              id: "",
              name: "",
              quantity: "",
            });
          }}
          variant="secondary"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {ingredients.map((item: any) => (
          <div key={item.id}>
            <Badge variant="outline">{item.name} - ({item.quantity})</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
