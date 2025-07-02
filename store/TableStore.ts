import { create } from "zustand";
interface TableStore {
    pageIndex: number,
    pageSize: number,
    setPageIndex: (pageIndex: number) => void,
    setPageSize: (pageSize: number) => void,
}

export const useTableStore = create<TableStore>((set) => ({
    pageIndex: 0,
    pageSize: 5,
    setPageIndex: (pageIndex) => set({ pageIndex }),
    setPageSize: (pageSize) => set({ pageSize }),
}))