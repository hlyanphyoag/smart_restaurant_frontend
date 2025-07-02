import { useQuery } from "@tanstack/react-query"
import { tableKey } from "./table.queryKey"
import { getAllTableFn } from "./table.queryFn"
import { Table } from "@/types/table"

export const useTableQuery = () => {
    return useQuery({
        queryKey: tableKey.getAllTable(),
        queryFn: getAllTableFn,
    })
}
    