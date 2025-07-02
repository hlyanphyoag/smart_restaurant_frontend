import { User, UserLogin, UserRegister, UserRegisterResponse } from "@/types/user"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { api } from "../api"
import { ApiErrorResponse } from "@/types/apiError"

export const useRegisterMutation = () => {
    return useMutation<
    UserRegisterResponse,
    AxiosError<ApiErrorResponse>,
    UserRegister
    >({
        mutationFn: async(payload: UserRegister) => {
            return await api.post('/api/auth/register', payload).then((res) => res.data )
        }
    })
}

export const useSignInMutation = () => {
    return useMutation<
    UserRegisterResponse,
    AxiosError<ApiErrorResponse>,
    UserLogin
    >({
        mutationFn: async(payload: UserLogin) => {
            return await api.post('/api/auth/login', payload).then((res) => res.data)
        }
    })
}