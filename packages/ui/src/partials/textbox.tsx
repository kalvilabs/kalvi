import React from "react";
import { cn } from "../lib/tw-class-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { FieldError } from "react-hook-form";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-base text-black",
      description: "text-sm text-gray-600",
      fieldError: "mt-1 text-xs",
    },
    defaultVariants: {
      variant: "default",
    },
  },
});

export interface TextboxProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  fieldError?: FieldError | boolean | undefined;
}

export const Textbox = React.forwardRef<HTMLParagraphElement, TextboxProps>(
  ({ variant, fieldError = undefined, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          textVariants({ variant, className }),
          fieldError && "text-red-500 mt-1 text-xs"
        )}
        {...props}
      />
    );
  }
);
Textbox.displayName = "Textbox";
