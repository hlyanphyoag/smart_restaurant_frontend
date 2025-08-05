import { ColumnDef } from "@tanstack/react-table";

export const ingredientColumns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "stock",
        header: "Stock"
    },
    {
        accessorKey: "unit",
        header: "Unit",
    },
]