import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/tw-class-merge";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center gap-3 whitespace-nowrap rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/80",
        ghost: 'bg-transparent text-black hover:bg-black/5',
        provider: "border text-black hover:bg-black/5",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: 'h-6 w-6'
      },
      textSize: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
      fontWeight: {
        default: 'font-medium',
        normal: 'font-normal'
      },
      contentPosition: {
        default: "justify-center",
        start: "justify-start",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      contentPosition: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  columnSpan?: number;
  width?: "full" | "auto";
  startIcon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      contentPosition,
      textSize,
      fontWeight,
      asChild = false,
      columnSpan,
      width,
      startIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const Icon = startIcon ? startIcon : undefined;
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            contentPosition,
            textSize,
            fontWeight,
            className,
          }),
          width === "full" && "w-full",
          columnSpan && `col-span-${columnSpan} grow`
        )}
        ref={ref}
        {...props}
      >
        {Icon && <Icon />}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
