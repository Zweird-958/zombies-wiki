import { Toggle as BaseToggle } from "@base-ui-components/react/toggle"
import type { ComponentProps } from "react"

import { type ToggleVariants, toggle } from "@/components/ui/toggle/variants"
import type { OmitClassName } from "@/types/ui"

export type ToggleProps = OmitClassName<ComponentProps<typeof BaseToggle>> &
  ToggleVariants

export const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
  <BaseToggle className={toggle({ variant, size, className })} {...props} />
)
