import { useQuery } from "@tanstack/react-query"
import { useGetFoodQuerFn } from "./food.queryFn"
import { foodQueryKey } from "./food.queryKey"
import { GetFoodResponse } from "@/types/food"

export const useGetFoodQuery = (name: string) => {
    return useQuery<GetFoodResponse>({
        queryKey: foodQueryKey.getAllFood(name),
        queryFn:() => useGetFoodQuerFn(name)
    })
}
