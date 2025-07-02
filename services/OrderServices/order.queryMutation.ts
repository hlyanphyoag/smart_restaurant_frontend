import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { postOrder, postOrderResponse } from "@/types/order"
import { AxiosError } from "axios"
import { ApiErrorResponse } from "@/types/apiError"

export const useOrderMutation = () => {
   return useMutation<
   postOrderResponse,
   AxiosError<ApiErrorResponse>,
   postOrder
   >({
    mutationFn: async(payload: postOrder) => {
        return await api.post('/api/orders', payload).then( (res) => res.data)
    }
   })
}