"use server";

import { axiosInstance } from "@/services/axiosService";
import axios from "axios";
import { cookies } from "next/headers";

export default async function refresh() {
  const cookieStore = cookies();
  try {
    const { data } = await axiosInstance({
      url: "/token/refresh/",
      method: "POST",
      data: {
        refresh: cookieStore.get("refresh_token")?.value,
      },
    });
    // cookieStore.set("refresh_token", data.refresh, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //     maxAge: 60 * 60 * 24,
    //   });
    //   cookieStore.set("access_token", data.access, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //     maxAge: 60 * 2,
    //   });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log({refresh:error.response?.data})
      throw new Error(error.response?.data.message);
    }
    console.log({refresh:error})
    throw new Error("Something unexpected happened!!");
  }
}
