"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ILoginUserAction {
  access: string;
  refresh: string;
}

export async function cookieSetter({ access, refresh }: ILoginUserAction) {
  cookies().set("Authorization", access, {
    httpOnly: true,
    secure: true,
  });
  cookies().set("Refresh", refresh, {
    httpOnly: true,
    secure: true,
  });
  redirect("/dashboard")
}
