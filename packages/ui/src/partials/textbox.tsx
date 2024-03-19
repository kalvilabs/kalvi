import React from "react";
import { cn } from "../lib/tw-class-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { FieldError } from "react-hook-form";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-black",
      description: "text-sm text-gray-600",
      fieldError: "mt-1 text-xs",
    },
    textSize: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    fontWeight: {
      default: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
    defaultVariants: {
      variant: "default",
      textSize: "default",
      fontWeight: "default",
    },
  },
});

type HeadingElement = HTMLHeadingElement | HTMLParagraphElement;

export interface TextboxProps
  extends React.HTMLAttributes<HeadingElement>,
    VariantProps<typeof textVariants> {
  fieldError?: FieldError | boolean;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
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
