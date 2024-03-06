"use client";

import React from "react";
import { FormItemWrapper, FormItemWrapperProps } from "../components/auth-page/input-wrapper";

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export interface FormItemProps extends FormItemWrapperProps {}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ width, className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <FormItemWrapper width={width} ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";
