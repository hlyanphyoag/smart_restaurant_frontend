import { useQuery } from "@tanstack/react-query"
import { ingredientsQueryKey } from "./ingredients.queryKey"
import { ingredientsQueryByParamFn, ingredientsQueryFn } from "./ingredients.queryFn"

export const useIngredientsQuery = () => {
    return useQuery({
        queryKey: ingredientsQueryKey.getAllIngredients(),
        queryFn: ingredientsQueryFn
    })
}

export const useIngredientsByPagination = (size : string, page : string) => {
  return  useQuery({
    queryKey: ingredientsQueryKey.getAllIngredientByPagination(size, page),
    queryFn: () => ingredientsQueryByParamFn(size, page)
  })
}

