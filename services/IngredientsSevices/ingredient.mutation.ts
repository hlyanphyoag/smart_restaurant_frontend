import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/apiError";

export const useIngredientMutation = () => {
  return useMutation<
    any,
    AxiosError<ApiErrorResponse>,
    { name: string; unit: string; stock: number }
  >({
    mutationFn: async (payload) => {
      return await api
        .post("/api/ingredients", payload)
        .then((res) => res.data);
    },
  });
};

export const useUpdateIngredientMutation = () => {
  return useMutation<
    any,
    AxiosError<ApiErrorResponse>,
    { id: string; stock: any }
  >({
    mutationFn: async ({ id, stock }: { id: string; stock: any }) => {
      return await api
        .patch(`/api/ingredients/${id}`, { stock: parseInt(stock) })
        .then((res) => res.data);
    },
  });
};
