"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiCall = async () : Promise<string> => {
    // TODO: Call API to find the branding setting
    return ""
}
export async function setBrandingCookie() {
    const color : string = await apiCall()
    cookies().set("BrandingColor", color);
}

export async function getBrandingCookie() {
    return cookies().get("BrandingColor")
}