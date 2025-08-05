import { create } from "zustand";

interface IngredientStore {
    ingredients: Object[];
    setIngredients: (ingredients: any) => void;
    removeAllIngredients: () => void;
}

export const useIngrdientStore = create<IngredientStore>((set) => ({
    ingredients: [],
    setIngredients: (ingredients: any) => set((prev: any) => ({
        ingredients: [...prev.ingredients, ingredients]
    })),
    removeAllIngredients: () => set({
        ingredients: []
    })
}))


export const stockRequestStore = create<any>((set) => ({
    orderItemStock: [],
    setStockRequest: (orderId : string , newItem: {name: string, ingredientId: string, quantity: number}) => set((prev: any) => {
        const existingIndex = prev.orderItemStock.findIndex((prevItem: any) => prevItem.id === orderId);
        if(existingIndex !== -1) {
            const updateStock = [...prev.orderItemStock];
            // console.log("updateStock:", updateStock)
            const existingIngredients = [...updateStock[existingIndex].ingredients];

            const ingredientIndex = existingIngredients.findIndex((i: any) => i.ingredientId === newItem.ingredientId);

                if(ingredientIndex !== -1) {
                    existingIngredients[ingredientIndex].quantity += newItem.quantity
                }else{
                    existingIngredients.push(newItem)
                }

                updateStock[existingIndex] = {
                    ...updateStock[existingIndex],
                    ingredients: existingIngredients,
                }

            return {
                orderItemStock: updateStock,
            }
        }
        return {
            orderItemStock: [
                ...prev.orderItemStock,
                {
                    id: orderId,
                    ingredients: [newItem]
                }
            ]
        };
    })
}));