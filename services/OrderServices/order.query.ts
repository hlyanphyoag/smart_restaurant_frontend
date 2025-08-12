import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOrderKey } from "./order.queryKey";
import {
  getAllOrderCountFn,
  getAllOrderFn,
  getAllOrderHistoryFn,
  getOneOrderFn,
} from "./order.queryFn";

export const useGetOneOrderQuery = (id: string) => {
  return useQuery({
    queryKey: getOrderKey.getOneOrderKey(id),
    queryFn: () => getOneOrderFn(id),
  });
};

export const useGetAllOrderQuery = (
  status: string,
  size: string,
  page: string
) => {
  return useQuery({
    queryKey: getOrderKey.getAllOrderKey(status, size, page),
    queryFn: () => getAllOrderFn(status, size, page),
  });
};

export const useGetPendingOrderQuery = (status: string, size: string) => {
  return useInfiniteQuery({
    queryKey: getOrderKey.getOrderInfiniteKey(status, size),
    queryFn: ({ pageParam = 1 }) =>
      getAllOrderFn(status, size, String(pageParam)),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
    initialPageParam: 1,
  });
};

export const useGetAllOrdersCount = () => {
  return useQuery({
    queryKey: getOrderKey.getAllOrderCountKey(),
    queryFn: getAllOrderCountFn,
  });
};

export const useGetOrderHistoryQuery = (status: string, size: string) => {
  return useInfiniteQuery({
    queryKey: getOrderKey.getOrderHistoryKey(status, size),
    queryFn: ({ pageParam = 1 }) =>
      getAllOrderHistoryFn(status, size, String(pageParam)),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.nextPage
        : undefined;
    },
    initialPageParam: 1,
  });
};
