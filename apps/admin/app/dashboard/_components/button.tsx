'use client'

import { Button } from "@repo/ui/partials";

import { cookieDestroyer } from "@/actions";

export function SignOutButton() {
  return <Button onClick={cookieDestroyer}>Sign Out</Button>;
}