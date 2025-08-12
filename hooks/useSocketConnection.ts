// hooks/useSocketConnection.ts
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/store/SocketStore";

export const useSocketConnection = (userId: string) => {
  const queryClient = useQueryClient();
  const { connect, disconnect, isConnected, socket } = useSocketStore();

  useEffect(() => {
    if (!userId) return;

    connect(userId, queryClient);

    return () => {
      disconnect();
    };
  }, [userId]);

  return { socket, isConnected };
};
