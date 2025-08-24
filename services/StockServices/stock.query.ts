import { useQuery } from "@tanstack/react-query";
import { getRequestStockKey } from "./stock.queryKey";
import { getAllRequestStockFn, getStockRequestCountsFn } from "./stock.queryFn";
import { api } from "../api";

export const useGetStockRequestQuery = (
  status: string,
  size: string,
  page: string
) => {
  return useQuery({
    queryKey: getRequestStockKey.getAllRequestStock(status, size, page),
    queryFn: () => getAllRequestStockFn(status, size, page),
  });
};

export const useGetStockRequestCountQuery = () => {
  return useQuery({
    queryKey: getRequestStockKey.getCount(),
    queryFn: getStockRequestCountsFn,
  });
};

export const useQueryStockTransaction = (page: string, size: string) => {
  return useQuery({
    queryKey: ["stock-records", page, size],
    queryFn: async () => {
      return await api
        .get("/api/ingredients/stock-records", {
          params: {
            page,
            size,
          },
        })
        .then((res) => res.data);
    },
  });
};
