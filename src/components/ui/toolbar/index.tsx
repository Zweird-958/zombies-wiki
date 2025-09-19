import { Toolbar as BaseToolBar } from "@base-ui-components/react/toolbar"
import type { ComponentProps } from "react"

import type { OmitClassName } from "@/types/ui"
import { cn } from "@/utils/cn"

export type ToolbarProps = OmitClassName<
  ComponentProps<typeof BaseToolBar.Root>
>

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
  <BaseToolBar.Root
    className={cn(
      "border-border flex w-fit gap-1 rounded-md border p-0.5",
      className,
    )}
    {...props}
  />
)

export type ToolbarGroupProps = OmitClassName<
  ComponentProps<typeof BaseToolBar.Group>
>

export const ToolbarGroup = ({ className, ...props }: ToolbarGroupProps) => (
  <BaseToolBar.Group className={cn("flex gap-0.5", className)} {...props} />
)

export type ToolbarButtonProps = OmitClassName<
  ComponentProps<typeof BaseToolBar.Button>
>

export const ToolbarButton = ({ className, ...props }: ToolbarButtonProps) => (
  <BaseToolBar.Button className={cn("", className)} {...props} />
)

export type ToolbarSeparatorProps = OmitClassName<
  ComponentProps<typeof BaseToolBar.Separator>
>

export const ToolbarSeparator = ({
  className,
  ...props
}: ToolbarSeparatorProps) => (
  <BaseToolBar.Separator
    className={cn("bg-border my-1 min-h-full w-[1px] rounded-md", className)}
    {...props}
  />
)
