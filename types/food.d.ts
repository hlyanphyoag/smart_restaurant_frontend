export interface Food {
    id: number;
    name: string;
    image: string[];
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

