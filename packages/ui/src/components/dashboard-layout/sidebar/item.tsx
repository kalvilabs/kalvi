"use client";

import React, { useContext } from "react";
import { Button } from "../../../partials/button";
import { cn } from "../../../lib/tw-class-merge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../partials/collapsible";
import { Linktag } from "../../../partials/link";
import { ChevronDownIcon, ChevronRightIcon, LucideIcon } from "lucide-react";
import { SidebarContext, SidebarPopover } from "./state";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../partials/tooltip";

export interface DashboardSidebarLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  icon: LucideIcon;
}

export const DashboardSidebarLink = React.forwardRef<
  HTMLAnchorElement,
  DashboardSidebarLinkProps
>(({ children, icon, ...props }, ref) => {
  const { isPopover } = useContext(SidebarPopover);
  const { isOpen } = useContext(SidebarContext);
  const Icon = icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Linktag
            ref={ref}
            size="button"
            contentPosition="start"
            variant="base"
            textSize="sm"
            {...props}
          >
            {
              <Icon
                className="w-5 h-5"
                strokeWidth={1.25}
                absoluteStrokeWidth={true}
              />
            }
            {(isOpen || isPopover) && children}
          </Linktag>
        </TooltipTrigger>
        {!isOpen && !isPopover && <TooltipContent>{children}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
});

export interface DashboardSidebarCollapsibleProps {
  triggerButtonIcon: LucideIcon;
  triggerButtonContent: React.ReactNode;
  contentComponent: React.ReactNode;
}

export function DashboardSidebarCollapsible({
  triggerButtonContent,
  triggerButtonIcon,
  contentComponent,
}: DashboardSidebarCollapsibleProps) {
  const { isOpen } = useContext(SidebarContext);
  const { isPopover } = useContext(SidebarPopover);
  const Icon = triggerButtonIcon;
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button
          fontWeight="normal"
          width="full"
          variant="ghost"
          contentPosition="start"
          textSize="sm"
        >
          <Icon
            className="w-5 h-5"
            strokeWidth={1.25}
            absoluteStrokeWidth={true}
          />
          {(isOpen || isPopover) && triggerButtonContent}
          {(isOpen || isPopover) && (
            <span className="flex items-center justify-end flex-grow">
              {open ? (
                <ChevronDownIcon className="w-5 h-5" strokeWidth={1.25} />
              ) : (
                <ChevronRightIcon className="w-5 h-5" strokeWidth={1.25} />
              )}
            </span>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className={cn("flex flex-col gap-1", (isOpen || isPopover) && "pl-8")}
        >
          {contentComponent}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
