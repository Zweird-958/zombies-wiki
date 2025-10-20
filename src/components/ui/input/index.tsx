import { Input as BaseInput } from "@base-ui-components/react/input"

import { type InputVariants, input } from "@/components/ui/input/variants"
import { cn } from "@/utils/cn"

export type InputProps = BaseInput.Props & InputVariants

export const Input = ({ className, radius, ...props }: InputProps) => (
  <BaseInput className={cn(input({ radius }), className)} {...props} />
)
