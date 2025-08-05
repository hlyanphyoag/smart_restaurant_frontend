import { ApiErrorResponse } from "@/types/apiError"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { api } from "../api"

export const useImageMutation = () => {
    return useMutation
    <
    any,
    AxiosError<ApiErrorResponse>,
    File[]
    >
    ({
       mutationFn: async(file: File[]) => {
        return await api.post('/api/imagekit/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => res.data)
       }
    })
}