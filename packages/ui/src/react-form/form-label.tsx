import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { useFormField } from "./form-field";
import { Label } from "../partials/label";

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} fieldError={error} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";
