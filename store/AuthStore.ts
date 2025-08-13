import { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  authUser: User | null;
  setAuthUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  setAuthUser: (user) => {
    set({ authUser: user });
  },
  logout: () => {
    set({ authUser: null });
  },
}));
