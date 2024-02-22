import React from "react";
import { useFormField } from "./form-field";
import { Textbox } from "../partials/textbox";

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <Textbox
      ref={ref}
      id={formDescriptionId}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";
