import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field"
import type { ComponentProps } from "react"

import type { OmitClassName } from "@/types/ui"
import { cn } from "@/utils/cn"

export type NumberFieldProps = OmitClassName<
  ComponentProps<typeof BaseNumberField.Root>
>

export const NumberField = ({ className, ...props }: NumberFieldProps) => (
  <BaseNumberField.Root
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
)

export type NumberFieldInputProps = OmitClassName<
  ComponentProps<typeof BaseNumberField.Input>
>

export const NumberFieldInput = ({
  className,
  ...props
}: NumberFieldInputProps) => (
  <BaseNumberField.Input
    className={cn(
      "border-input rounded-md border px-2 py-1 focus:ring focus:outline-none",
      className,
    )}
    {...props}
  />
)
