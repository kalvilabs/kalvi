import React from "react";
import { useFormContext } from "react-hook-form";
import { Textbox } from "../partials/textbox";

export const FormRootError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formState } = useFormContext();
  const { errors } = formState;

  if (!errors.root) {
    return null;
  }
  
  return (
    <Textbox
      variant="fieldError"
      ref={ref}
      id="form-root-error"
      fieldError={true}
      {...props}
    >
      {errors.root.message}
    </Textbox>
  );
});
