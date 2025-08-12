// hooks/useSocketEvent.ts
import { useSocketStore } from "@/store/SocketStore";
import { useEffect } from "react";

export const useSocketEvent = (
  event: string,
  callback: (data: any) => void
) => {
  const { addListener } = useSocketStore();

  useEffect(() => {
    const unsubscribe = addListener(event, callback);
    return () => unsubscribe();
  }, [event, callback]);
};
