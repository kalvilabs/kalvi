'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function cookieDestroyer() {
  cookies().delete("Authorization");
  cookies().delete("Refresh");
  redirect('/home');
}
