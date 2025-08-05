export interface Food {
    id: number;
    name: string;
    images: string[];
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}

export interface GetFoodResponse {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    currenElements: number;
    nextPage: number | null;
    results: Food[];
}

export interface AddFoodItem {
    name: string;
    description: string;
    price: number;
    images: string[];
    ingredients: {
        name: string,
        id: string,
        quantity: number
    }[]
}

