import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Edit2Icon, Edit3, Edit3Icon, Trash } from "lucide-react";
import { DeleteProductModal } from "./DeleteProductModal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import EditProductModal from "./EditProductModal";
import { useState } from "react";

export const columns: ColumnDef<any>[] = [
  {
    accessorFn: (row: any) => row.name,
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex items-center gap-x-2">
          <img
            src={row.original.images[row.original.images.length - 1]}
            alt={name}
            className="h-10 w-10 rounded-full"
          />
          <p className="text-sm font-semibold text-neutral-500">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description;
      return <div className="text-sm text-neutral-500">{description}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      return (
        <div className="text-sm font-semibold text-neutral-500">{price} MMK</div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      const id = row.original.id;
      console.log("ID:", id);
      const [open, setOpen ] = useState(false);
      return (
        <div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-500 font-bold"
                onClick={() => setOpen(true)}
              >
                <Edit size={20} />
              </Button>
            </AlertDialogTrigger>
            <EditProductModal id={id} onClose={()=>setOpen(false)} />
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 font-bold"
              >
                <Trash size={20} />
              </Button>
            </AlertDialogTrigger>
            <DeleteProductModal id={id}/>
          </AlertDialog>
        </div>
      );
    },
  },
];
