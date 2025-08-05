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

export const useOrderConfirmMutation = () => {
   return useMutation<
   any,
   AxiosError<ApiErrorResponse>,
   {id: string}
   >({
      mutationFn: async({id}: {id: string}) => {
        return await api.patch(`/api/orders/${id}/confirm`).then((res) => res.data)
      }
   })
}

export const useOrderCompleteMutation = () => {
   return useMutation<
    any,
    AxiosError<ApiErrorResponse>,
    {id: string}
   >({
      mutationFn: async({id} : {id: string}) => {
        return await api.patch(`/api/orders/${id}/complete`).then((res) => res.data)
      }
   }
)
}

export const useOrderStatusMutation = () => {
   return useMutation<
   any,
   AxiosError<ApiErrorResponse>,
   {id: string}
   >({
      mutationFn: async({id}: {id: string}) => {
         return await api.patch(`/api/orders/${id}/ready`).then((res) => res.data)
      }
   }
)
}