"use server";

import { LOGOUT_URL } from "@/api-routes";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function cookieDestroyer() {
  try {
    await axios.post(
      LOGOUT_URL,
      {
        refresh_token: cookies().get("Refresh")?.value,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("Authorization")?.value}`,
        },
      }
    );
    cookies().delete("Authorization");
    cookies().delete("Refresh");
    redirect("/");
  } catch (e) {
    // TODO: Handle error with a popup or message and prevent signout to prevent the token from being live
    console.error(e);
  }
}
