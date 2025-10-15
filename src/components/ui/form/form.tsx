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

import {
  ComboboxInput,
  type ComboboxInputProps,
} from "@/components/ui/combobox"
import {
  FormFieldContext,
  FormItemContext,
} from "@/components/ui/form/contexts"
import { FormError } from "@/components/ui/form/form-error"
import { useFormField } from "@/components/ui/form/hooks"
import { InputImageController } from "@/components/ui/form/image"
import type {
  FormDescriptionProps,
  FormFieldInputProps,
  FormFieldNumberInputProps,
  FormInputProps,
  FormItemProps,
  FormLabelProps,
  FormWrapperProps,
  ImageInputFieldProps,
} from "@/components/ui/form/types"
import { Input, type InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NumberField,
  NumberFieldInput,
  type NumberFieldInputProps,
  NumberFieldScrubArea,
} from "@/components/ui/number-field"
import { cn } from "@/utils/cn"

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
      <Field.Root
        data-slot="form-item"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </FormItemContext>
  )
}

export const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const { error, formItemId } = useFormField()

  return (
    <Field.Label
      data-slot="form-label"
      data-error={Boolean(error)}
      className={cn(
        "data-[error=true]:text-danger transition-colors",
        className,
      )}
      htmlFor={formItemId}
      render={<Label />}
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
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export const FormInput = ({
  inputType = "input",
  ...props
}: FormInputProps) => {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField()

  const commonProps = {
    "data-slot": "form-control",
    id: formItemId,
    "aria-describedby": !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": Boolean(error),
  }

  if (inputType === "input") {
    return (
      <Field.Control
        {...commonProps}
        {...(props as InputProps)}
        render={<Input />}
      />
    )
  }

  if (inputType === "number") {
    return (
      <Field.Control
        {...commonProps}
        render={<NumberFieldInput {...(props as NumberFieldInputProps)} />}
      />
    )
  }

  return (
    <Field.Control
      render={
        <ComboboxInput {...commonProps} {...(props as ComboboxInputProps)} />
      }
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
        {description && <FormDescription>{description}</FormDescription>}
        <FormError />
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

export const FormFieldNumberInput = ({
  name,
  label,
  description,
  ...props
}: FormFieldNumberInputProps) => (
  <FormField
    name={name}
    render={({ field: { value: _, ...field } }) => (
      <FormItem render={<NumberField onValueChange={field.onChange} />}>
        {label && (
          <NumberFieldScrubArea>
            <FormLabel>{label}</FormLabel>
          </NumberFieldScrubArea>
        )}
        <FormInput inputType="number" {...field} {...props} />
        {description && <FormDescription>{description}</FormDescription>}
        <FormError />
      </FormItem>
    )}
  />
)

export const FormWrapper = ({ className, ...props }: FormWrapperProps) => (
  <form className={cn("flex flex-col gap-4", className)} {...props} />
)

export { FormError }
