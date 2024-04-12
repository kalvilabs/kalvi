'use client'

import { Button } from "@repo/ui/partials";

import { authCookieDestroy } from "@/actions";

export function SignOutButton() {
  return <Button onClick={() => authCookieDestroy()}>Sign Out</Button>;
}