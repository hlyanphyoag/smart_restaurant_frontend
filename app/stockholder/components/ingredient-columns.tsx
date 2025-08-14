import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateIngredientMutation } from "@/services/IngredientsSevices/ingredient.mutation";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const ingredientColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }: any) => {
      const stock = row.original;
      const [open, setOpen] = useState(false);
      const [inputStock, setInputStock] = useState("");
      const [updateStock, setUpdateStock] = useState(stock?.stock || "");
      const { mutate: updateIngredientMutation, isPending } =
        useUpdateIngredientMutation();

      const queryClient = useQueryClient();

      console.log("UpdateStock:", updateStock);

      const handleStock = () => {
        const update = updateStock + parseInt(inputStock);
        setUpdateStock(update);
      };

      const handleUpdateStock = () => {
        updateIngredientMutation(
          { id: stock.id, stock: updateStock },
          {
            onSuccess: (data) => {
              toast.success("Update Stock Succcess!");
              queryClient.invalidateQueries({
                queryKey: ["all-ingredients"],
              });
              setOpen(false);
            },
            onError: (e) => {
              console.log("Error:", e);
            },
          }
        );
      };

      if (stock)
        return (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer">
              <Edit size={20} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Stock</DialogTitle>
                <div>
                  {stock.name} Update Stock - {updateStock}
                </div>
                <div className="flex gap-x-2">
                  <Input
                    placeholder={stock.stock}
                    value={inputStock}
                    onChange={(e) => setInputStock(e.target.value)}
                  />
                  <Button
                    disabled={
                      !inputStock?.trim() || isNaN(parseInt(inputStock))
                    }
                    onClick={handleStock}
                    variant="secondary"
                  >
                    <Plus />
                  </Button>
                </div>
                <Button
                  disabled={
                    isPending ||
                    !updateStock?.toString()?.trim() ||
                    isNaN(parseInt(updateStock))
                  }
                  variant="customize"
                  onClick={handleUpdateStock}
                >
                  Update Stock
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
    },
  },
];
