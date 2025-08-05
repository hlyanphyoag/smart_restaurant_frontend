import { api } from "../api";

export const useGetFoodQuerFn = async(name: string, page: string, size: string) => {
    return await api.get('/api/food',{
        params: { name, page, size } 
    }).then( res => res.data);
}

export const useGetPopularFoodFn = async() => {
    return await api.get("/api/dashboard/most-ordered").then(res => res.data)
}

export const useGetRecommandedFoodFn = async() => {
    return await api.get("/api/dashboard/recommended-food").then(res => res.data)
}

export const useGetFoodByIdQueryFn = async(id: string) => {
    return await api.get(`/api/food/${id}`).then(res => res.data)
}

export const useGetMostOrderFoodQueryFn = async(size: string) => {
    return await api.get('/api/dashboard/most-ordered-dishes',{
        params: {size}
    }).then(res => res.data)
}

export const useGetIngredientsQueryFn = async(id: string) => {
    return await api.get(`/api/food/${id}/ingredients`).then(res => res.data)
}