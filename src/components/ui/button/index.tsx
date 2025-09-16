import { LoaderCircleIcon } from "lucide-react"
import type { ComponentProps } from "react"

import { type ButtonVariants, button } from "@/components/ui/button/variants"
import cn from "@/utils/cn"

export type ButtonProps = { isPending?: boolean } & ComponentProps<"button"> &
  ButtonVariants

export const Button = ({
  className,
  color,
  size,
  radius,
  variant,
  disabled,
  isPending,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={cn(button({ color, size, radius, variant, className }))}
    disabled={isPending ?? disabled}
    {...props}
  >
    {isPending && <LoaderCircleIcon className="animate-spin" />}
    {children}
  </button>
)
