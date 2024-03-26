'use client';

import React from "react";
import { SidebarContext, SidebarPopover } from "./state";
import { cn } from "../../../lib/tw-class-merge";
import { Linktag } from "../../../partials/link";

export interface DashboardSidebarLogoProps {
  sidebarOpenIcon: React.ReactNode;
  sidebarCloseIcon: React.ReactNode;
}
export function DashboardSidebarLogo({
  sidebarOpenIcon,
  sidebarCloseIcon,
}: DashboardSidebarLogoProps) {
  const { isOpen } = React.useContext(SidebarContext);
  const {isPopover} = React.useContext(SidebarPopover);
  return (
    <div className={cn("p-2 m-2 shrink-0 flex gap-2 items-center rounded-md", !isOpen && !isPopover && 'bg-gray-200')}>
      <Linktag className="flex items-center justify-start">
        {(isOpen || isPopover) ? sidebarOpenIcon : sidebarCloseIcon}
      </Linktag>
    </div>
  );
}
