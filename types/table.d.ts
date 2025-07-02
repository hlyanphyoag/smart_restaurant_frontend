export interface Table {
        id: string,
        number: number,
        seats: number,
        occupied: boolean,
        note: string,
        createdAt: string,
        updatedAt: string
}

export interface PatchTable {
    tableId: string,
    occupied: boolean
}