"use server";

import { LOGOUT_URL } from "@/api-routes";
import axios, { AxiosRequestHeaders } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function authCookieDestroy() {
  try {
    await axios.post(
      LOGOUT_URL,
      {
        refresh_token: cookies().get("Refresh")?.value,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("Authorization")?.value}`,
        } as AxiosRequestHeaders,
      }
    );
    cookies().delete("Authorization");
    cookies().delete("Refresh");
  } catch (e) {
    // TODO: Handle error with a popup or message and prevent sign out to prevent the token from being live
    console.error(e);
  }
  revalidatePath('/home/login')
  redirect("/home/login");
}

interface ILoginUserAction {
  access: string;
  refresh: string;
}

export async function authCookieSetter({ access, refresh }: ILoginUserAction) {
  cookies().set("Authorization", access, {
    httpOnly: true,
    secure: true,
  });
  cookies().set("Refresh", refresh, {
    httpOnly: true,
    secure: true,
  });
  redirect("/admin/dashboard")
}
