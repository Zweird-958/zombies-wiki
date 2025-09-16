"use client"

import { Field } from "@base-ui-components/react/field"
import { useTranslations } from "next-intl"
import * as React from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"

import { form } from "@/components/ui/form/variants"

export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

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

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

export type FormItemProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Root>,
  "className"
>

export const FormItem = ({ className, ...props }: FormItemProps) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <Field.Root className={form().root({ className })} {...props} />
    </FormItemContext.Provider>
  )
}

export type FormLabelProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Label>,
  "className" | "htmlFor"
>

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

export type FormDescriptionProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Description>,
  "className"
>

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

export type FormErrorProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Error>,
  "className"
>

export const FormError = ({ className, ...props }: FormErrorProps) => {
  const { error, formMessageId, name } = useFormField()
  const t = useTranslations(`errors.${name}`)
  const body = error?.message ? String(t(error.message)) : props.children

  if (!body) {
    return null
  }

  return (
    <Field.Description
      data-slot="form-message"
      data-error={Boolean(error)}
      id={formMessageId}
      className={form().error({ className })}
      {...props}
    >
      {body}
    </Field.Description>
  )
}

export type FormInputProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Control>,
  "className"
>

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

export type FormFieldInputProps = {
  name: string
  placeholder?: string
  label?: string
  description?: string
} & Omit<React.ComponentProps<typeof FormField>, "render" | "defaultValue">

export const FormFieldInput = ({
  name,
  label,
  placeholder,
  description,
  ...props
}: FormFieldInputProps) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormInput placeholder={placeholder} {...field} />
        <FormError />
        {description && <FormDescription>{description}</FormDescription>}
      </FormItem>
    )}
    {...props}
  />
)
