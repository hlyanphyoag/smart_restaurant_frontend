import { create } from "zustand";

interface StatusStore {
    status: string;
    setStatus: (status: string) => void;
}

export const useStatusStore = create<StatusStore>((set) => ({
    status: '',
    setStatus: (status: string) => set({status})
}))

export const notiStore = create<any>((set) => ({
    notifications: [] as any,
    setNotifications: (notifications: any) => set((prev: any) => ({notifications: [...prev.notifications, notifications]})),
    removeNotification: () => set({
        notifications: []
    })
}))