export const getOrderKey = {
    getOneOrderKey : (id: string) => ['order', id],
    getAllOrderKey : (status: string, size: string, page: string) => ['order', status, size, page],
    getOrderInfiniteKey: (status: string, size: string) => ['order-infinite', status, size],
    getAllOrderCountKey: () => ['allOrderCount'],
    getOrderHistoryKey: (status: string, size: string) => ['orderHistory', status, size]
}