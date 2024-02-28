import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../src/lib/tw-class-merge";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "grow bg-black text-white hover:bg-black/80",
        provider: "border text-black hover:bg-black/5"
      },
      size: {
        default: "h-10 px-4 py-2",
      },
      columnSpan: {
        1: "col-span-1",
        2: "col-span-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      columnSpan: 1,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  width?: 'full' | 'auto';
  startIcon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      width = 'auto',
      startIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const StartIcon = startIcon;
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          width === 'full' && "w-full"
        )}
        ref={ref}
        {...props}
      >
        {StartIcon && (
          <StartIcon
            stroke={variant === "provider" ? "transparent" : "currentColor"}
            className="w-5 h-5"
          />
        )}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

