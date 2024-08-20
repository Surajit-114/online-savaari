"use server";
import{ axiosInstance } from "@/services/axiosService";
import axios from "axios";
import { cookies } from "next/headers";

type TLoginBody = {
  account_email: string;
  account_password: string;
};

type THandleLogin = {
    account_email: string;
    role: string;
    refresh_token: string;
    access_token: string;
  }
  

export async function handleLogin({
    account_email,
    role,
    access_token,
    refresh_token,
  }: THandleLogin) {
    const cookieStore = cookies();
    cookieStore.set("email", account_email, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("role", role, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 *2,
    });
}
  

export default async function login(body: TLoginBody) {
  try {
    const { data } = await axiosInstance({
      url: "/accounts/login/",
      method: "POST",
      data: body,
    });
    handleLogin({
      access_token: data.access,
      account_email: data.account_email,
      role: data.role,
      refresh_token: data.refresh,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Something unexpected happened!!");
  }
}
