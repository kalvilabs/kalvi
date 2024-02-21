import React from "react"
import { useFormField } from "./form-field"
import { cn } from "../../lib/tw-class-merge"

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-gray-400", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"