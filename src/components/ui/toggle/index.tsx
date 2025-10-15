import { Toggle as BaseToggle } from "@base-ui-components/react/toggle"

import { type ToggleVariants, toggle } from "@/components/ui/toggle/variants"
import { cn } from "@/utils/cn"

export type ToggleProps = BaseToggle.Props & ToggleVariants

export const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
  <BaseToggle className={cn(toggle({ variant, size }), className)} {...props} />
)
