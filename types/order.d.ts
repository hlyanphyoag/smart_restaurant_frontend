interface orderItem {
    foodItemId: string;
    quantity: number;
    note: string
}

export interface postOrder {
    customerId: string ;
    totalCost: number;
    tableId: string | null;
    address: string ;
    orderItems: orderItem[]
}

export interface postOrderResponse {
        id: string,
        customerId: string,
        status: string,
        confirmedById: string,
        cookedById: string,
        completedAt: string,
        createdAt: string,
        updatedAt: string,
        tableId: string,
        customer: {
            id: string,
            profilePic: string,
            name: string
        },
        cookedBy: string,
        confirmedBy: string,
        table: {
            id: string,
            number: number,
            seats: number,
            occupied: boolean,
            note: string,
            createdAt: string,
            updatedAt: string
        },
        bill: {
            id: string
        }
        _count: {
            items: number
        }
}