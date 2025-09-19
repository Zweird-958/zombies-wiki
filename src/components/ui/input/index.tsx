import { Input as BaseInput } from "@base-ui-components/react/input"
import type { ComponentProps } from "react"

import { form } from "@/components/ui/form/variants"
import type { OmitClassName } from "@/types/ui"

export type InputProps = OmitClassName<ComponentProps<typeof BaseInput>>

export const Input = ({ className, ...props }: InputProps) => (
  <BaseInput className={form().input({ className })} {...props} />
)
