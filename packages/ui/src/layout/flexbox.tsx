import { cn } from "../lib/utils";
import { ClassValue } from "clsx";
import { ElementType, ReactNode } from "react";

interface FlexProps {
  classNames?: ClassValue;
  key?: string;
  as?: keyof HTMLElementTagNameMap;
  children: ReactNode;
}

export default function Flexbox({ classNames, as, children, key }: FlexProps) {
  const Type: ElementType = as ? as : "div";
  return (
    <Type key={key} className={cn("flex justify-center items-center gap-md flex-wrap justify-items-center", classNames)}>
      {children}
    </Type>
  );
}
