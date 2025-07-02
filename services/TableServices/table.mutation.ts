import { useMutation } from "@tanstack/react-query"
import { api } from "../api"
import { PatchTable, Table } from "@/types/table"
import { AxiosError } from "axios"
import { ApiErrorResponse } from "@/types/apiError"

export const useTableMutation = () => {
    return useMutation<
       Table,
       AxiosError<ApiErrorResponse>,
       PatchTable
    >({
        mutationFn: async({tableId, occupied}: PatchTable) => {
            return await api.patch(`/api/table/${tableId}`, {
                occupied
            }).then((res) => res.data) 
        }
    })
}