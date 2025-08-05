import { create } from 'zustand';

interface CartStore {
    cart: object[];
    addToCart : (item: any) => void;
    removeFromCart : (id: number) => void;
    removeAllCart: () => void
    increaseQuantity : (id: number) => void;
    decreaseQuantity : (id: number) => void;
    GrandTotalPrice : (cart: any) => string;
}

export const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addToCart: (item: any) => set((prev: any) => {
        const existingItem = prev.cart.find((prevItem : any) => prevItem.id === item.id)
        if(existingItem) {
            return prev
        }
        return {
            cart: [...prev.cart, {...item, quantity: 1 }]
        }
    }),  

    removeFromCart: (id: number) => set((prev: any) => ({
        cart: prev.cart.filter((item: any) => item.id !== id)
    })),
     
    removeAllCart: () => set({
        cart: []
    }),

    increaseQuantity: (id: number) => set((prevItem : any) => ({
        cart: prevItem.cart.map((item: any) => item.id === id ? {...item, quantity: item.quantity + 1, totalPrice: (item.price * (item.quantity + 1)).toFixed(2)} : item)
    })),

    decreaseQuantity: (id: number) => set((prevItem : any) => ({
        cart: prevItem.cart.map((item: any) => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity -1, totalPrice: (item.price * (item.quantity -1)).toFixed(2)} : item)
    })),

    GrandTotalPrice : (cart: any) => {
        const total = cart.reduce((acc: number, item: any) => acc + (item.totalPrice ? Number(item.totalPrice) : Number(item.price)), 0).toFixed(2)
        return total;
    }
}))