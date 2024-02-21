import * as React from "react"

import * as LabelPrimitive from "@radix-ui/react-label"
import { useFormField } from "./form-field"
import { Label } from "../label"

import { cn } from "../../lib/tw-class-merge"

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-red-500", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"