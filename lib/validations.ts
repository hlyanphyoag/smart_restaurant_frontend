import { z } from "zod"

export const signUpSchema = z.object({
    name : z.string().min(3, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export const singInSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
})

export const foodSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().min(3, "Description is required"),
    price: z.coerce.number().min(1, "Price is required"),
    images: z.array(z.string().min(1, "At least one image is required")),
    ingredients: z.array(z.object({
        name: z.string().min(1, "At least one ingredient is required"),
        id: z.string().min(1, "At least one ingredient is required"),
        quantity: z.coerce.number().min(1, "Quantity is required")
    }))
})