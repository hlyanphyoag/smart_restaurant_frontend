export type UserRole = "CUSTOMER" | "CASHIER" | "KITCHEN" | "STOCKHOLDER" | "ADMIN";

export interface User {
    accessToken: string;
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    profilePic: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
   name: string;
   email: string;
   password: string;
   role: string;
}

export interface UserRegisterResponse {
    token: string;
    user: User
}