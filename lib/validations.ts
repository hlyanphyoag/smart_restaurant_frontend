import { z } from "zod"

export const signUpSchema = z.object({
    name : z.string().min(3, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["CUSTOMER", "CASHIER", "KITCHEN", "STOCKHOLDER", "ADMIN"], {required_error: "Role is required"})
})

export const singInSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
})