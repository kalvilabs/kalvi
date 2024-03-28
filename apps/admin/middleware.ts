import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const verifyUser = async (redirectRoute: string, request: NextRequest) => {
  const currentUser = cookies().get("Authorization")?.value;
  if (!currentUser) {
    return NextResponse.redirect(new URL(redirectRoute, request.url));
  }
  const { payload } = await jwtVerify(
    currentUser,
    new TextEncoder().encode(process.env.JWT_SECRET as string)
  );
  if (!payload) {
    return NextResponse.rewrite(new URL(redirectRoute, request.url));
  }
  return NextResponse.next();
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.toString() === "/") {
    return NextResponse.rewrite(new URL("/home", request.url));
  }
  if (request.nextUrl.pathname.toString() === "/home") {
    const currentUser = cookies().get("Authorization")?.value;
    if (currentUser) {
      const { payload } = await jwtVerify(
        currentUser,
        new TextEncoder().encode(process.env.JWT_SECRET as string)
      );
      if (payload) {
        return NextResponse.rewrite(new URL("/admin/dashboard", request.url));
      }
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return verifyUser("/home", request);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
