import apiClient from "@/services/axiosService";
import { MutationFunction, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

type QueryConfig = {
  url: string;
  queryKey: string;
};

type MutationConfig = {
  url: string;
  mutationKey: string;
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
};

const useReactQuery = () => ({
  useAppQuery: <T>({
    url,
    queryKey,
  }: QueryConfig): UseQueryResult<T, Error> => {
    return useQuery<T, Error>({
      queryKey: [queryKey],
      queryFn: async () => {
        return apiClient<T>({ url, method: "GET" });
      },
    });
  },
  useAppMutation: <T>({ mutationKey, url, method = "POST" }: MutationConfig) => {
    return useMutation<T, Error, any>({
      mutationKey:[mutationKey],
      mutationFn: async (data:any) => {
        return apiClient<T>({ url, method, data});
      },
    });
  },
});
export default useReactQuery;
