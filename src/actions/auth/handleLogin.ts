"use server";

import { cookies } from "next/headers";

interface Props {
  account_email: string;
  role: string;
  refresh_token: string;
  access_token: string;
}

export default async function handleLogin({
  account_email,
  role,
  access_token,
  refresh_token,
}: Props) {
  const cookieStore = cookies();
  cookieStore.set("email", account_email, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 7,
  });
  cookieStore.set("role", role, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 7,
  });
  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 7,
  });
  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 7,
  });
}
