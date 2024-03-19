import React from "react";
import { cn } from "../lib/tw-class-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva(
  "ring-offset-white inline-flex gap-3 rounded-md items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:cursor-pointer",
  {
    variants: {
      variant: {
        inline: "text-stone-500",
        base: "text-black hover:bg-black/5",
        fieldError: "mt-1 text-xs",
      },
      textSize: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      },
      size: {
        button: 'default: "h-10 px-4 py-2',
        default: "",
      },
      contentPosition: {
        default: "justify-center",
        start: "justify-start",
      },
    },
    defaultVariants: {
      variant: "inline",
      textSize: "default",
      contentPosition: "default",
      size: "default",
    },
  }
);

export interface LinktagProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

/**
 * This is currently an anchor tag.
 *
 * So the next/link needs to use the legacyBehavior and passHref prop
 *
 * This needs to be modified if the legacyBehavior is removed from next/link
 */
export const Linktag = React.forwardRef<HTMLAnchorElement, LinktagProps>(
  (
    { variant, textSize, size, contentPosition, className, asChild, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({ variant, textSize, contentPosition, className, size })
        )}
        {...props}
      />
    );
  }
);
Linktag.displayName = "Linktag";
