import type { ComponentProps } from "react"

import { label } from "@/components/ui/label/variants"
import { cn } from "@/utils/cn"

export type LabelProps = ComponentProps<"label">

export const Label = ({ className, ...props }: LabelProps) => (
  <label className={cn(label(), className)} data-slot="label" {...props} />
)
