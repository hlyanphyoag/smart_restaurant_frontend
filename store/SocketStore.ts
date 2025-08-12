// stores/socketStore.ts
import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import { devtools } from "zustand/middleware";
import { QueryClient } from "@tanstack/react-query";

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

type Listener = (data: any) => void;

type SocketState = {
  socket: Socket | null;
  isConnected: boolean;
  connect: (userId: string, queryClient: QueryClient) => void;
  disconnect: () => void;
  addListener: (event: string, callback: Listener) => () => void;
};

export const useSocketStore = create<SocketState>()(
  devtools((set, get) => ({
    socket: null,
    isConnected: false,

    connect: (userId, queryClient) => {
      if (!userId || get().socket) return;

      const socket = io(SOCKET_URL, {
        query: { userId },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Socket connected:", userId);
        set({ isConnected: true });
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        set({ isConnected: false });
      });

      // Socket Events (centralized)
      socket.on("table-changes", () => {
        queryClient.invalidateQueries({ queryKey: ["getAllTable"] });
      });

      socket.on("connected-users", (data) => {
        console.log("Connected Users:", data);
      });

      socket.on("new-order", () => {
        queryClient.invalidateQueries({ queryKey: ["order"] });
      });

      socket.on("new_stock_request", () => {
        queryClient.invalidateQueries({ queryKey: ["getAllRequestStock"] });
      });

      socket.on("order-changes", () => {
        queryClient.invalidateQueries({ queryKey: ["order-infinite"] });
        queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
        queryClient.invalidateQueries({ queryKey: ["getAllRequestStock"] });
      });

      socket.on("order-ready", () => {
        queryClient.invalidateQueries({ queryKey: ["order-infinite"] });
        queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
      });

      set({ socket });
    },

    disconnect: () => {
      const { socket } = get();
      socket?.disconnect();
      set({ socket: null, isConnected: false });
    },

    addListener: (event, callback) => {
      const { socket } = get();
      if (!socket) return () => {};

      socket.on(event, callback);

      return () => {
        socket.off(event, callback);
      };
    },
  }))
);
