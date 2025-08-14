import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useStockMutation = () => {
  return useMutation({
    mutationFn: async (stockRequest: any) => {
      return await api
        .post("/api/stock-requests", stockRequest)
        .then((res) => res.data);
    },
  });
};

export const useApproveStockMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await api
        .patch(`/api/stock-requests/${id}/approve`)
        .then((res) => res.data);
    },
  });
};
