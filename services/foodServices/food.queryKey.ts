export const foodQueryKey = {
    getAllFood : (name: string, page: string, size: string) => ['getAllFood', name, page, size ],
    getPopularFood: () => ['getPopularFood'],
    getRecommandedFood: () => ['getRecommandedFood'],
    getFoodById : (id: string) => ['getFoodById', id],
    getMostOrderFood: (size: string) => ['getMostOrderFood', size],
    getIngredients: (id: string) => ['getIngredients', id]
}