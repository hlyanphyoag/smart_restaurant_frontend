import { api } from "../api"

export const getAllTableFn = async() => {
    return await api.get('/api/table').then( res => res.data);
}