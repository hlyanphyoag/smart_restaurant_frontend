import { api } from "../api";

export const useGetFoodQuerFn = async(name: string) => {
    return await api.get('/api/food',{
        params: { name } 
    }).then( res => res.data);
}