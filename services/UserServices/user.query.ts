import { useQuery } from "@tanstack/react-query"
import { userQueryKey } from "./user.queryKey"
import getUserQueryFn from "./user.queryFn"

export const useQueryUser = (page: string, size: string , role: string) => {
   return useQuery({
        queryKey: userQueryKey.getUser(page, size, role),
        queryFn: () => getUserQueryFn(page, size, role),
    })
}