export const getOrderKey = {
    getOneOrderKey : (id: string) => ['order', id],
    getAllOrderKey : (status: string, size: string, page: string) => ['order', status, size, page],
}