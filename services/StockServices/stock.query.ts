import { useQuery } from "@tanstack/react-query"
import { getRequestStockKey } from "./stock.queryKey"
import { getAllRequestStockFn, getStockRequestCountsFn } from "./stock.queryFn"

export const useGetStockRequestQuery = (status: string, size: string, page: string) => {
    return useQuery({
        queryKey: getRequestStockKey.getAllRequestStock(status, size, page),
        queryFn: () => getAllRequestStockFn(status, size, page)
    })
}

export const useGetStockRequestCountQuery = () => {
    return useQuery({
        queryKey: getRequestStockKey.getCount(),
        queryFn:  getStockRequestCountsFn
    })
}