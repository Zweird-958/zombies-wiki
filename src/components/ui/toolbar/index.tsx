import { Toolbar as BaseToolBar } from "@base-ui-components/react/toolbar"

import { toolbar } from "@/components/ui/toolbar/variants"
import { cn } from "@/utils/cn"

const styles = toolbar()

export type ToolbarProps = BaseToolBar.Root.Props

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
  <BaseToolBar.Root className={cn(styles.base(), className)} {...props} />
)

export type ToolbarGroupProps = BaseToolBar.Group.Props

export const ToolbarGroup = ({ className, ...props }: ToolbarGroupProps) => (
  <BaseToolBar.Group className={cn(styles.group(), className)} {...props} />
)

export type ToolbarButtonProps = BaseToolBar.Button.Props

export const ToolbarButton = ({ className, ...props }: ToolbarButtonProps) => (
  <BaseToolBar.Button className={cn(styles.button(), className)} {...props} />
)

export type ToolbarSeparatorProps = BaseToolBar.Separator.Props

export const ToolbarSeparator = ({
  className,
  ...props
}: ToolbarSeparatorProps) => (
  <BaseToolBar.Separator
    className={cn(styles.separator(), className)}
    {...props}
  />
)
