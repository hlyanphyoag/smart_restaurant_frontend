import { useQuery } from "@tanstack/react-query"
import { getOrderKey } from "./order.queryKey"
import { getAllOrderFn, getOneOrderFn } from "./order.queryFn"

export const useGetOneOrderQuery = (id: string) => {
    return useQuery({
        queryKey: getOrderKey.getOneOrderKey(id),
        queryFn: () => getOneOrderFn(id)
    })
}

export const useGetAllOrderQuery = (status: string, size: string, page: string) => {
    return useQuery({
        queryKey: getOrderKey.getAllOrderKey(status, size, page),
        queryFn: () => getAllOrderFn(status, size, page)
    })
}