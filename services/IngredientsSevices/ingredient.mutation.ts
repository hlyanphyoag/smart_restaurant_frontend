import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { AxiosError } from "axios"
import { ApiErrorResponse } from "@/types/apiError"

export const useIngredientMutation = () => {
    return useMutation<
        any,
        AxiosError<ApiErrorResponse>,
        { name: string; unit: string; stock: number }
    >({
        mutationFn: async(payload) => {
            return await api.post('/api/ingredients', payload).then(res=> res.data)
        }
    })
}