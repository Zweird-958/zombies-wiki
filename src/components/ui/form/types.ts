import type { Field } from "@base-ui-components/react/field"
import type { NumberField } from "@base-ui-components/react/number-field"

import type { FormField } from "@/components/ui/form/form"
import type { InputImageControllerProps } from "@/components/ui/form/image"

export type FormItemProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Root>,
  "className"
>

export type FormLabelProps = { className?: string; isField?: boolean } & Omit<
  React.ComponentProps<typeof Field.Label>,
  "className" | "htmlFor"
>

export type FormDescriptionProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Description>,
  "className"
>

export type FormErrorProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Error>,
  "className"
>

export type FormInputProps = { className?: string } & Omit<
  React.ComponentProps<typeof Field.Control>,
  "className"
>

export type FormNumberInputProps = { className?: string } & Omit<
  React.ComponentProps<typeof NumberField.Input>,
  "className"
>

export type FormFieldInputProps = {
  name: string
  label?: string
  description?: string
} & FormInputProps

export type FormFieldNumberInputProps = {
  name: string
  label?: string
  description?: string
} & FormNumberInputProps

export type ImageInputFieldProps = { name: string } & Pick<
  InputImageControllerProps,
  "label" | "description"
> &
  Omit<React.ComponentProps<typeof FormField>, "render" | "defaultValue">

export type FormWrapperProps = React.ComponentProps<"form">
