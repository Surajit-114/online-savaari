"use client";

import { getCookie, setCookie } from "@/lib/authCookies";
import { axiosPublic } from "@/services/axiosService";

export const useRefreshToken = () => {
  const token = getCookie("refresh_token");
  const refreshToken = async () => {
    try {
      const { data } = await axiosPublic({
        url: "/token/refresh/",
        method: "POST",
        data: {
          refresh: token,
        },
      });
      setCookie({ name: "refresh_token", value: data.refresh });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return refreshToken;
};
