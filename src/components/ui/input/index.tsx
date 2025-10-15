import { Input as BaseInput } from "@base-ui-components/react/input"

import { cn } from "@/utils/cn"

export type InputProps = BaseInput.Props

export const Input = ({ className, ...props }: InputProps) => (
  <BaseInput
    className={cn(
      "border-input rounded-md border px-2 py-1 focus:ring focus:outline-none",
      className,
    )}
    {...props}
  />
)
