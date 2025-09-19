"use client"

import { Slot } from "@radix-ui/react-slot"
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

export const FormItem = ({ asChild, className, ...props }: FormItemProps) => {
  const id = React.useId()
  const Comp = asChild ? Slot : "div"

  return (
    <FormItemContext value={{ id }}>
      <Comp
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
    <Label
      data-slot="form-label"
      data-error={Boolean(error)}
      className={cn(
        "data-[error=true]:text-danger transition-colors",
        className,
      )}
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
    <p
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
    return <Input {...commonProps} {...(props as InputProps)} />
  }

  if (inputType === "number") {
    return (
      <NumberFieldInput
        {...commonProps}
        {...(props as NumberFieldInputProps)}
      />
    )
  }

  return <ComboboxInput {...commonProps} {...(props as ComboboxInputProps)} />
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
    render={({ field }) => (
      <FormItem asChild>
        <NumberField>
          {label && <FormLabel>{label}</FormLabel>}
          <FormInput inputType="number" {...field} {...props} />
          {description && <FormDescription>{description}</FormDescription>}
          <FormError />
        </NumberField>
      </FormItem>
    )}
  />
)

export const FormWrapper = ({ className, ...props }: FormWrapperProps) => (
  <form className={cn("flex flex-col gap-4", className)} {...props} />
)

export { FormError }
