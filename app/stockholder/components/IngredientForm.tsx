"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useIngredientMutation } from "@/services/IngredientsSevices/ingredient.mutation"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ingredientname must be at least 2 characters.",
  }),
  unit: z.string().min(2, {message: "Unit must be at least 2 characters."}),
  stock: z.number().min(1, {message: "stock must be at least 1"})
})

export function IngredientForm() {

    const {mutate: ingredientMutation} = useIngredientMutation()
    const router = useRouter()
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit: "",
      stock: 1
    },
  })
  
      const onSubmit: SubmitHandler<any> = async (data) => {
        console.log("FormData:", form)
          const payload = {
            name: data.name,
            unit: data.unit,
            stock: data.stock
          }
          ingredientMutation(payload, {
            onSuccess: (data) => {
                console.log("IngredientSuccess:", data)
                form.reset()
                toast.success("Ingredient Created Success!")
                router.push("/stockholder")
            },
            onError: (error) => {
                console.log("Error", error)
            }
          })
      }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient Name</FormLabel>
              <FormControl>
                <Input placeholder="ingredient name" {...field} />
              </FormControl>
              <FormDescription>
                This is your ingredient name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient Unit</FormLabel>
              <FormControl>
                <Input placeholder="ingredient unit" {...field} />
              </FormControl>
              <FormDescription>
                This is your ingredient unit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredeint Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="stock" {...field} value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormDescription>
                This is your stock quantity
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="customize" type="submit">Add Ingredient</Button>
      </form>
    </Form>
  )
}