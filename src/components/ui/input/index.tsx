import { Input as BaseInput } from "@base-ui-components/react/input"

import { input } from "@/components/ui/input/variants"
import { cn } from "@/utils/cn"

export type InputProps = BaseInput.Props

export const Input = ({ className, ...props }: InputProps) => (
  <BaseInput className={cn(input(), className)} {...props} />
)
