import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAxiosAuth } from "./auth/useAxiosAuth";
import { axiosPublic } from "@/services/axiosService";
import axios from "axios";

type QueryConfig = {
  url: string;
  params?: any;
  queryKey: string;
};

type MutationConfig = {
  url: string;
  mutationKey: string;
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  params?: any;
};

const useReactQuery = () => {
  const axiosProtected = useAxiosAuth();
  const usePublicQuery = <T>({
    url,
    params,
    queryKey,
  }: QueryConfig): UseQueryResult<T, Error> => {
    return useQuery<T, Error>({
      queryKey: [queryKey],
      queryFn: async () => {
        try {
          const response = await axiosPublic.request<T>({
            url,
            method:"GET",
            params,
          });
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    });
  };
  const useProtectedQuery = <T>({
    url,
    params,
    queryKey,
  }: QueryConfig): UseQueryResult<T, Error> => {
    return useQuery<T, Error>({
      queryKey: [queryKey],
      queryFn: async () => {
        try {
          const response = await axiosProtected.request<T>({
            url,
            method:"GET",
            params,
          });
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    });
  };

  const usePublicMutation = <T>({
    mutationKey,
    url,
    method = "POST",
    params,
  }: MutationConfig) => {
    return useMutation<T, Error, any>({
      mutationKey: [mutationKey],
      mutationFn: async (data: any) => {
        try {
          const response = await axiosPublic.request<T>({
            url,
            method,
            data,
            params,
          });
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    });
  };
  const useProtectedMutation = <T>({
    mutationKey,
    url,
    params,
    method = "POST",
  }: MutationConfig) => {
    return useMutation<T, Error, any>({
      mutationKey: [mutationKey],
      mutationFn: async (data: any) => {
        try {
          const response = await axiosProtected.request<T>({
            url,
            method,
            data,
            params,
          });
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    });
  };

  return {
    useProtectedMutation,
    usePublicMutation,
    useProtectedQuery,
    usePublicQuery,
  };
};

// const useReactQuery = () => ({
//   useAppQuery: <T>({
//     url,
//     queryKey,
//   }: QueryConfig): UseQueryResult<T, Error> => {
//     return useQuery<T, Error>({
//       queryKey: [queryKey],
//       queryFn: async () => {
//         return apiClient<T>({ url, method: "GET" });
//       },
//     });
//   },
//   useAppMutation: <T>({ mutationKey, url, method = "POST" }: MutationConfig) => {
//     return useMutation<T, Error, any>({
//       mutationKey:[mutationKey],
//       mutationFn: async (data:any) => {
//         return apiClient<T>({ url, method, data});
//       },
//     });
//   },
// });
export default useReactQuery;
