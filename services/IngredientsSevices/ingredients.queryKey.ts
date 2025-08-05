export const ingredientsQueryKey = {
    getAllIngredients: () => ['ingredients'],
    getAllIngredientByPagination : (size: string, page: string) => ['all-ingredients',  size, page]
}