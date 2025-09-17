import type { ComponentProps } from "react"

import { cn } from "@/utils/cn"

type Props = ComponentProps<"div">

const CenteredDiv = ({ className, ...props }: Props) => (
  <div
    className={cn("flex w-full items-center justify-center", className)}
    {...props}
  />
)

export default CenteredDiv
