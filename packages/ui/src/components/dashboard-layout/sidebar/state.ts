'use client'

import { createContext } from "react";

export const SidebarContext = createContext({isOpen: false, setOpen: (open: boolean) => {}});

export const SidebarPopover = createContext({isPopover: false});