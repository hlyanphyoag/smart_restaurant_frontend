import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { FoodForm } from "../../Components/FoodForm";
import { foodSchema } from "@/lib/validations";
import { useGetFoodByIdQuery } from "@/services/foodServices/food.query";
import { usePatchFoodMutation } from "@/services/foodServices/food.mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";

const EditProductModal = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const { data: foodDefaultValues } = useGetFoodByIdQuery(id);
  console.log("FoodDefaultValues:", foodDefaultValues);
  const queryClient = useQueryClient();

  const {
    mutate: patchFoodMutation,
    isPending,
    isError,
  } = usePatchFoodMutation();
  const onSubmit = async (
    data: any
  ): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
        ingredients: data.ingredients.map((ingredient: any) => ({
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
        })),
      };
      console.log("SubmitData:", data);
      patchFoodMutation(
        {
          id: foodDefaultValues.id,
          payload: payload,
        },
        {
          onSuccess: (data) => {
            console.log("Success:", data);
            onClose();
            toast.success("Food Item Updated Successfully");
            queryClient.invalidateQueries({
              queryKey: ["getAllFood"],
            });
            queryClient.invalidateQueries({
              queryKey: ["getFoodById", id],
            });
            return { success: true };
          },
          onError: (err) => {
            console.log("Error:", err);
            toast.error("Food Item Updated Failed");
            return { success: false, error: "Food Item Updated Failed" };
          },
        }
      );
    });
  };
  return (
    <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <AlertDialogTitle>Edit Product</AlertDialogTitle>
        <AlertDialogCancel>
          <XIcon />
        </AlertDialogCancel>
      </div>

      <FoodForm
        schema={foodSchema}
        defaultValues={foodDefaultValues}
        onSubmit={onSubmit}
      />
    </AlertDialogContent>
  );
};

export default EditProductModal;
