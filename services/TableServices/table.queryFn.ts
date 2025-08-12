import { api } from "../api";

export const getAllTableFn = async () => {
  return await api
    .get("/api/table?sortBy=number&sortOrder=asc&size=1000")
    .then((res) => res.data);
};
