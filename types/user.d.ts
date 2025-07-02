export type UserRole = "CUSTOMER" | "CASHIER" | "KITCHEN" | "STOCKHOLDER" | "ADMIN";

export interface User {
    accessToken: string;
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
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
   role: UserRole;
}

export interface UserRegisterResponse {
    token: string;
    user: User
}