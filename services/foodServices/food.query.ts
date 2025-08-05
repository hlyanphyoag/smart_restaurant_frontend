import { useQueries, useQuery } from "@tanstack/react-query"
import { useGetFoodByIdQueryFn, useGetFoodQuerFn, useGetIngredientsQueryFn, useGetMostOrderFoodQueryFn, useGetPopularFoodFn, useGetRecommandedFoodFn } from "./food.queryFn"
import { foodQueryKey } from "./food.queryKey"
import { GetFoodResponse } from "@/types/food"

export const useGetFoodQuery = (name: string, page: string, size: string) => {
    return useQuery<GetFoodResponse>({
        queryKey: foodQueryKey.getAllFood(name, page, size),
        queryFn:() => useGetFoodQuerFn(name, page, size)
    })
}

export const useGetPopularFood = () => {
    return useQuery<GetFoodResponse>({
        queryKey: foodQueryKey.getPopularFood(),
        queryFn: useGetPopularFoodFn
    })
}

export const useGetRecommendedFood = () => {
    return useQuery<GetFoodResponse>({
        queryKey: foodQueryKey.getRecommandedFood(),
        queryFn: useGetRecommandedFoodFn
    })
}

export const useGetFoodByIdQuery = (id: string) => {
    return useQuery({
        queryKey: foodQueryKey.getFoodById(id),
        queryFn: () => useGetFoodByIdQueryFn(id)
    })
}

export const useGetMostOrderedFoodQuery = (size: string) => {
    return useQuery({
        queryKey: foodQueryKey.getMostOrderFood(size),
        queryFn: () => useGetMostOrderFoodQueryFn(size)
    })
}

export const useGetIngredientsQuery = (foodItem : any[]) => {  
   return useQueries({
      queries: foodItem.map((item: any) => {
        return {
        queryKey: foodQueryKey.getIngredients(item.id),
        queryFn: () => useGetIngredientsQueryFn(item.id),
        enabled: !!item.id
      }})
   })  
}