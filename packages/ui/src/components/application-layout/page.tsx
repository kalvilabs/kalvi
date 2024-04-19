"use client";

import { ReactNode, useEffect } from "react";
import { themeVariablesCSS } from "@repo/tailwind-config/css-variable-setter";

export function ApplicationLayout({ children }: { children: ReactNode }) {

  useEffect(() => {
    themeVariablesCSS()
  }, []);

  return <body className="h-screen w-full light bg-primary">{children}</body>;
}
