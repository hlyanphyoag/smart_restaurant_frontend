import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { AxiosError } from "axios"
import { ApiErrorResponse } from "@/types/apiError"
import { AddFoodItem, Food } from "@/types/food"

export const useAddFoodMutation = () => {
    return useMutation<
     Food,
     AxiosError<ApiErrorResponse>,
     AddFoodItem
    >
    ({
        mutationFn: async(payload: AddFoodItem) =>{
            return await api.post('/api/food', payload).then(res => res.data)
        }
    })
}

export const useDeleteFoodMutation = () => {
    return useMutation<
    any,
    AxiosError<ApiErrorResponse>,
    string
    >({
        mutationFn: async(id: string) => {
            return  api.delete(`/api/food/${id}`).then(res => res.data)
        }
    })
}

export const usePatchFoodMutation = () => {
    return useMutation<
    Food,
    AxiosError<ApiErrorResponse>,
    {id: string, payload: AddFoodItem}>({
        mutationFn: async({id, payload}: {id: string, payload: AddFoodItem}) => {
            console.log("ID:", id)
            console.log("Payload:", payload)
            return api.patch(`/api/food/${id}`, payload).then(res => res.data)
        }
    })
}