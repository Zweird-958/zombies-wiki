import type { NumberField } from "@base-ui-components/react/number-field"
import type { ComponentProps } from "react"

import type { ComboboxInputProps } from "@/components/ui/combobox"
import type { FormField } from "@/components/ui/form/form"
import type { InputImageControllerProps } from "@/components/ui/form/image"
import type { InputProps } from "@/components/ui/input"
import type { LabelProps } from "@/components/ui/label"
import type { NumberFieldInputProps } from "@/components/ui/number-field"

export type FormItemProps = {
  asChild?: boolean
} & ComponentProps<"div">

export type FormLabelProps = LabelProps

export type FormDescriptionProps = ComponentProps<"p">

export type FormErrorProps = ComponentProps<"p">

export type FormInputProps =
  | ({
      inputType?: "input"
    } & InputProps)
  | ({
      inputType: "combobox"
    } & ComboboxInputProps)
  | ({
      inputType: "number"
    } & NumberFieldInputProps)

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
