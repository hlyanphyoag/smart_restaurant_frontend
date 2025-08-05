'use client'
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDeleteFoodMutation } from "@/services/foodServices/food.mutation"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
  
  export function DeleteProductModal({id}: {id: string}) {
    const queryClient = useQueryClient()
    const {mutate: deleteProductMutation , isPending, isError } = useDeleteFoodMutation();
    const onSubmit = () => {
        deleteProductMutation(id, {
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries({
                    queryKey: ['getAllFood']
                })
                toast.success('Food Item Deleted Successfully') 
            },
            onError: (err) => {
                console.log(err)
            }
        })
    }
    return (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className={cn(buttonVariants({variant: "destructive"}))} onClick={onSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
    )
  }
  