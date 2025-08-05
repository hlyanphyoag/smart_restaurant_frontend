import { api } from "../api"

export const getAllRequestStockFn = async(status: string, size: string, page: string) => {
    const params = status ? {status, size, page} : {size, page}
    return await api.get('/api/stock-requests', {params}).then(res => res.data)
}

export const getStockRequestCountsFn = async() => {
    return await api.get('/api/stock-requests/count').then(res => res.data)
}