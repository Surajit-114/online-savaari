"use client";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosProtected } from "@/services/axiosService";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosAuth = () => {
  const { auth } = useAuth();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosProtected.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosProtected.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${newToken.access}`;
          return axiosProtected(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosProtected.interceptors.request.eject(requestIntercept);
      axiosProtected.interceptors.response.eject(responseIntercept);
    };
  }, [auth.access_token, refreshToken]);

  return axiosProtected;
};
