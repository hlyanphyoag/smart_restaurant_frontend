import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { m } from "motion/react";
import HolderModal from "./HolderModal";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "kitchenUser",
    header: "Kitchen Staff",
    cell: ({ row }: any) => {
      const user = row.original.kitchenUser;
      return (
        <div className="flex gap-x-2">
                {user.profilePic ? (
                  <img src={user.profilePic} alt={user.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-400 text-white font-semibold flex items-center justify-center">{user.name[0]}</div>
                )}
                <div className="flex flex-col justify-start items-start">
                    <p className="text-gray-600 text-sm font-semibold">{user.name}</p>
                    <small>{user.email}</small>
                </div>
            </div>
      );
    },
  },
  {
   accessorKey: "items",
   header: "Items",
   cell:  (({row} : any) => {
    const items= row.original.ingredients;
    console.log("items:", items);
    return (
        <div className="flex gap-2">
            {items.map((item: any) => (
                <div key={item.id}>
                    <Badge className="bg-blue-400">
                        {item.ingredient.name}
                    </Badge>
                </div>
            ))}
        </div>
    )
   })
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }: any) => {
      const createdAt = row.original.createdAt;
      return (
        <div className="text-xs font-semibold">{formatDistanceToNow(new Date(createdAt))} ago</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.original.status;
      return (
        <div>
          {status === "PENDING" ? (
            <Badge variant="outline" className="bg-orange-100 text-orange-500">Pending</Badge>
          ) :  (
            <Badge variant="secondary">Completed</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (({row} : any) => {
        console.log("row:", row.original.status)
        const stockRequestId = row.original.id
        const requestStock = row.original.ingredients;
        return(
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                  asChild 
                  type="button" 
                  variant="customize" 
                  size="sm" 
                  className="text-xs">
                  <span>View Details</span>
                </Button>
            </DialogTrigger>
            <HolderModal stockRequestId={stockRequestId} status={row.original.status}  requestStock={requestStock}/>
        </Dialog>
    )})
  }
];
