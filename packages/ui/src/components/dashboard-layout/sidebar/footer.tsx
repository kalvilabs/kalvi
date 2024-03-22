"use client";

import React from "react";
import { SidebarContext, SidebarPopover } from "./state";
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";
import { cn } from "../../../lib/tw-class-merge";
import { Button } from "../../../partials/button";

export interface DashboardSidebarFooterProps {
  children?: React.ReactNode;
}

export function DashboardSidebarFooter({
  children,
}: DashboardSidebarFooterProps) {
  const { isOpen, setOpen } = React.useContext(SidebarContext);
  const {isPopover} = React.useContext(SidebarPopover);
  return (
    <footer
      className={cn(
        "border-t px-4 py-2 flex gap-2",
        (isOpen || isPopover) ? 'flex-row-reverse justify-end' : "flex-col"
      )}
    >
      {children}
      {isOpen && !isPopover && (
        <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
          <PanelLeftCloseIcon
            className="w-5 h-5"
            strokeWidth={1.25}
            absoluteStrokeWidth={true}
          />
        </Button>
      )}
      {!isOpen && !isPopover && (
        <Button variant='ghost' size='icon' onClick={() => setOpen(true)}>
          <PanelLeftOpenIcon
            className="w-5 h-5"
            strokeWidth={1.25}
            absoluteStrokeWidth={true}
          />
        </Button>
      )}
    </footer>
  );
}
