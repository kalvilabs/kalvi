import React from "react";
import { useFormField } from "./form-field";
import { Textbox } from "../partials/textbox";

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Textbox
      variant="fieldError"
      ref={ref}
      id={formMessageId}
      fieldError={error}
      {...props}
    >
      {body}
    </Textbox>
  );
});
FormMessage.displayName = "FormMessage";
