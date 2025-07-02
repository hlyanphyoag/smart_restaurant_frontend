
import { api } from "../api"

export const getOneOrderFn = async(id: string) => {
    return await api.get(`/api/orders/${id}`).then(res => res.data)
}

export const getAllOrderFn = async(status: string, size: string, page: string) => {
    const params = status ? {status, size, page} : {size, page}
    return await api.get('api/orders', {params}).then(res => res.data)
}