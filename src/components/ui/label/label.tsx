import type { ComponentProps } from "react"

import { cn } from "@/utils/cn"

export type LabelProps = ComponentProps<"label">

export const Label = ({ className, ...props }: LabelProps) => (
  <label
    className={cn(
      "text-primary block leading-none font-medium transition-opacity select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    )}
    data-slot="label"
    {...props}
  />
)
