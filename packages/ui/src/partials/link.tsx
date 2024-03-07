import React from "react"
import { cn } from "../lib/tw-class-merge";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva(
  "ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md",
  {
    variants: {
      variant: {
        default: "inline text-stone-500",
        fieldError: "mt-1 text-xs",
      },
      textSize: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      textSize: "default"
    },
  }
);

export interface LinktagProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof textVariants> {
    }

/**
 * This is currently an anchor tag.
 * 
 * So the next/link needs to use the legacyBehavior and passHref prop
 * 
 * This needs to be modified if the legacyBehavior is removed from next/link
 */
export const Linktag = React.forwardRef<
  HTMLAnchorElement,
  LinktagProps
>(({variant, textSize, className, ...props }, ref) => {
  

  return (
    <a
      ref={ref}
      className={cn(textVariants({ variant, textSize, className }))}
      {...props}
    />
  )
})
Linktag.displayName = "Linktag"