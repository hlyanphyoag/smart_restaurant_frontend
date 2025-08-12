"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const useSocket = (userId: string) => {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const listenersRef = useRef<Map<string, ((data: any) => void)[]>>(new Map());

  useEffect(() => {
    if (!userId) return;
    const socket = io(`${SOCKET_URL}`, {
      query: { userId },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected as: ", userId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected as:", userId);
    });

    socket.on("table-changes", (data) => {
      console.log("Table Changes:", data);
      queryClient.invalidateQueries({
        queryKey: ["getAllTable"],
      });
    });

    socket.on("connected-users", (data) => {
      console.log("Connected Users:", data);
    });

    socket.on("new-order", (data) => {
      console.log("New Order Changes: ", data);
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    });

    socket.on("new_stock_request", (data) => {
      console.log("Stock Request Changes:", data);
      queryClient.invalidateQueries({
        queryKey: ["getAllRequestStock"],
      });
    });

    socket.on("order-changes", (data) => {
      console.log("Order Changes: ", data);
      queryClient.invalidateQueries({
        queryKey: ["order-infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orderHistory"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllRequestStock"],
      });
    });

    socket.on("order-ready", (data) => {
      console.log("Order Ready: ", data);
      queryClient.invalidateQueries({
        queryKey: ["order-infinite"],
      }),
        queryClient.invalidateQueries({
          queryKey: ["orderHistory"],
        });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const addListner = (event: string, callback: (data: any) => void) => {
    if (!socketRef.current) return () => {};
    listenersRef.current.set(event, [
      ...(listenersRef.current.get(event) || []),
      callback,
    ]);
    socketRef.current.on(event, callback);

    return () => {
      if (socketRef.current) {
        socketRef.current.off(event, callback);
        listenersRef.current.delete(event);
      }
    };
  };
  return {
    socket: socketRef.current,
    isConnected,
    addListner,
  };
};
