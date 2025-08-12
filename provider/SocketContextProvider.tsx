"use client";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  addListner: (event: string, callback: (data: any) => void) => () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "SocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { socket, isConnected, addListner } = useSocket(userId!);
  return (
    <SocketContext.Provider value={{ socket, isConnected, addListner }}>
      {children}
    </SocketContext.Provider>
  );
};
