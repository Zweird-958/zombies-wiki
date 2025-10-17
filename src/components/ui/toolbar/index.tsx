import { Toolbar as BaseToolBar } from "@base-ui-components/react/toolbar"

import { cn } from "@/utils/cn"

export type ToolbarProps = BaseToolBar.Root.Props

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
  <BaseToolBar.Root
    className={cn(
      "border-border flex w-fit gap-1 rounded-md border p-0.5",
      className,
    )}
    {...props}
  />
)

export type ToolbarGroupProps = BaseToolBar.Group.Props

export const ToolbarGroup = ({ className, ...props }: ToolbarGroupProps) => (
  <BaseToolBar.Group className={cn("flex gap-0.5", className)} {...props} />
)

export type ToolbarButtonProps = BaseToolBar.Button.Props

export const ToolbarButton = ({ className, ...props }: ToolbarButtonProps) => (
  <BaseToolBar.Button
    className={cn(
      "hover:bg-accent hover:text-accent-foreground rounded-md px-2",
      className,
    )}
    {...props}
  />
)

export type ToolbarSeparatorProps = BaseToolBar.Separator.Props

export const ToolbarSeparator = ({
  className,
  ...props
}: ToolbarSeparatorProps) => (
  <BaseToolBar.Separator
    className={cn("bg-border my-1 min-h-full w-[1px] rounded-md", className)}
    {...props}
  />
)
