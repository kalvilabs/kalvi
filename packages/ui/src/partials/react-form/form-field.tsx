'use client'

import React from "react"

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { FormItemContext } from "./form-item"

export const Form = FormProvider

/** 
 * This is an extensible type that can be used to add additional properties to the form field context
 * */ 
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

/**
 * This is a context that is used to provide the form field context to the form field
 *
 * @default {} as FormFieldContextValue
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * This is a component that is used to provide the form field context to the form field
 *
 * @param props
 * @param props.name - The name of the field
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * This is a hook that is used to get the form field context
 * 
 * This hook should be used within the form field
 * 
 * @returns The form field context
 */
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}