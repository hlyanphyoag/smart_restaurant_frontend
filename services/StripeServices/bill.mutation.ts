import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { AxiosError } from "axios"
import { ApiErrorResponse } from "@/types/apiError"

interface stripeResponse {
  url : string
}

interface paymentMethodReq {
  id: string
  paymentMethod: string
  paymentStatus: string
}

export const useStripeInitiateMutation = () => {
    return  useMutation<
    stripeResponse,
    AxiosError<ApiErrorResponse>,
    string
    >({
        mutationFn: async(billId : string) => {
          return await api.post(`/api/stripe/checkout/${billId}`).then((res) => res.data)
        }
    })
}

export const usePaymentMethodMutation = () => {
  return useMutation<
  any,
  AxiosError<ApiErrorResponse>,
  paymentMethodReq
  >({
    mutationFn: async({id, paymentMethod} : paymentMethodReq) => {
      return await api.patch(`/api/bills/${id}`, {paymentMethod}).then((res) => res.data)
    }
  })
}

export const usePaymentStatusMutation = () => {
  return useMutation<any, AxiosError<ApiErrorResponse>, {id: string, paymentStatus: string}>({
    mutationFn: async({id, paymentStatus} : {id: string, paymentStatus: string}) => {
      return await api.patch(`/api/bills/${id}`, {paid: paymentStatus}).then((res) => res.data)
    }
  })
}