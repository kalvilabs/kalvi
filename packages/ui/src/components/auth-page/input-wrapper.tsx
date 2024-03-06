import { cn } from "../../lib";
import React from "react";
import { BaseSyntheticEvent } from "react";
/**
 * It is wrapper class for the input fields in which the inputs should be passed as children.
 *
 * Preferrably the children should be InputField components
 *
 */
export function FormWrapper({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any>
  ) => Promise<void>;
}) {
  return (
    <form className="w-full gap-4 spce-y-4 grid grid-cols-2" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export interface FormItemWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "half" | "full";
}

export const FormItemWrapper = React.forwardRef<
  HTMLDivElement,
  FormItemWrapperProps
>(({ width = "full", className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(width === "half" ? "col-span-1" : "col-span-2")}
      {...props}
    />
  );
});
FormItemWrapper.displayName = "FormItemWrapper";

export function FormFooter({ children, isMarginTop }: { children: React.ReactNode, isMarginTop?: boolean }) {
  return (
    <footer className={cn("space-y-4 space-x-2 col-span-2", isMarginTop && 'mt-2')}>
      {children}
    </footer>
  );
}
