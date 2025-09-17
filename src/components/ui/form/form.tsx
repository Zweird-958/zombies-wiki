"use client"

import { Field } from "@base-ui-components/react/field"
import * as React from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
} from "react-hook-form"

import { FormFieldContext, FormItemContext } from "@/components/ui/form/context"
import { FormError } from "@/components/ui/form/form-error"
import { useFormField } from "@/components/ui/form/hooks"
import { InputImageController } from "@/components/ui/form/image"
import type {
  FormDescriptionProps,
  FormFieldInputProps,
  FormInputProps,
  FormItemProps,
  FormLabelProps,
  FormWrapperProps,
  ImageInputFieldProps,
} from "@/components/ui/form/types"
import { form } from "@/components/ui/form/variants"

export const Form = FormProvider

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext>
)

export const FormItem = ({ className, ...props }: FormItemProps) => {
  const id = React.useId()

  return (
    <FormItemContext value={{ id }}>
      <Field.Root className={form().root({ className })} {...props} />
    </FormItemContext>
  )
}

export const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const { error, formItemId } = useFormField()

  return (
    <Field.Label
      data-slot="form-label"
      data-error={Boolean(error)}
      className={form().label({ className })}
      htmlFor={formItemId}
      {...props}
    />
  )
}

export const FormDescription = ({
  className,
  ...props
}: FormDescriptionProps) => {
  const { formDescriptionId } = useFormField()

  return (
    <Field.Description
      data-slot="form-description"
      id={formDescriptionId}
      className={form().description({ className })}
      {...props}
    />
  )
}

export const FormInput = ({ className, ...props }: FormInputProps) => {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField()

  return (
    <Field.Control
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={Boolean(error)}
      className={form().input({ className })}
      {...props}
    />
  )
}

export const FormFieldInput = ({
  name,
  label,
  description,
  ...props
}: FormFieldInputProps) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormInput {...field} {...props} />
        <FormError />
        {description && <FormDescription>{description}</FormDescription>}
      </FormItem>
    )}
  />
)

export const ImageInputField = ({
  name,
  label,
  description,
  ...props
}: ImageInputFieldProps) => (
  <FormField
    name={name}
    render={({ field: { onChange, value } }) => (
      <FormItem>
        <InputImageController
          label={label}
          description={description}
          onChange={onChange}
          value={value as File | null}
        />
      </FormItem>
    )}
    {...props}
  />
)

export const FormWrapper = ({ className, ...props }: FormWrapperProps) => (
  <form className={form().wrapper({ className })} {...props} />
)

export { FormError }
