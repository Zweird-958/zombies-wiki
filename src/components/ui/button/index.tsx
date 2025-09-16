import type { ComponentProps } from "react"

import { type ButtonVariants, button } from "@/components/ui/button/variants"
import cn from "@/utils/cn"

export type ButtonProps = ComponentProps<"button"> & ButtonVariants

export const Button = ({
  className,
  color,
  size,
  radius,
  variant,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={cn(
      button({ color, size, radius, variant, className, disabled }),
    )}
    disabled={disabled}
    {...props}
  />
)
