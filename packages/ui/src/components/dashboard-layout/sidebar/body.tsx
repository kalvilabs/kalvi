"use client";

import React from "react";
import { cn } from "../../../lib/tw-class-merge";
import { SidebarContext, SidebarPopover } from "./state";

export interface DashboardSidebarBodyProps {
  children: React.ReactNode;
  isPopover?: boolean;
}

export function DashboardSidebarBody({
  children,
  isPopover = false,
}: DashboardSidebarBodyProps) {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <SidebarPopover.Provider value={{ isPopover }}>
    <SidebarContext.Provider value={{ isOpen, setOpen }}>
      <aside
        className={cn(
          "h-full sticky bottom-0 z-50 flex-col ",
          (isOpen || isPopover) ? "w-64" : "w-16",
          !isPopover ? 'border-r border-gray-200 hidden lg:flex' : 'flex',
        )}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
    </SidebarPopover.Provider>
  );
}
