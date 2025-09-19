import { Input as BaseInput } from "@base-ui-components/react/input"
import type { ComponentProps } from "react"

import type { OmitClassName } from "@/types/ui"
import { cn } from "@/utils/cn"

export type InputProps = OmitClassName<ComponentProps<typeof BaseInput>>

export const Input = ({ className, ...props }: InputProps) => (
  <BaseInput
    className={cn(
      "border-input rounded-md border px-2 py-1 focus:ring focus:outline-none",
      className,
    )}
    {...props}
  />
)
