import { cn } from "../lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

interface HeadingProps {
  level: "page" | "content" | "subContent1" | "subContent2";
  classNames?: ClassValue;
  children: ReactNode;
  themed? :boolean
}

export const Heading = ({ level, classNames, children, themed }: HeadingProps) => {
  const Heading =
    level === "page"
      ? "h1"
      : level === "content"
        ? "h2"
        : level === "subContent1"
          ? "h3"
          : "h4";
  return (
    <Heading
      className={cn(
        "font-bold",
        themed && 'text-primary',
        level === "page" && "text-3xl",
        level === "content" && "text-xl",
        level === "subContent1" && "text-lg",
        level === "subContent2" && "text-base",
        classNames
      )}
    >
      {children}
    </Heading>
  );
};
