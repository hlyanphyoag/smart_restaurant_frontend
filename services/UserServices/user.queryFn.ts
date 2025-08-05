import { api } from "../api";

export default function getUserQueryFn(page: string, size: string, role: string) {
    return api.get(`/api/users`, {
        params: {
            page,
            size,
            role
        }
    }).then(res => res.data)
}