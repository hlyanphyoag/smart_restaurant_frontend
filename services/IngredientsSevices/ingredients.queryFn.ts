
import { api } from "../api"

export const ingredientsQueryFn = async() => {
    return await api.get('/api/ingredients').then((res) => res.data)
}

export const ingredientsQueryByParamFn = async(size : string, page : string) => {
    return await api.get('/api/ingredients', { params: { size, page } }).then(res => res.data)
}