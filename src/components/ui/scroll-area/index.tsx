import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area"

import { scrollArea } from "@/components/ui/scroll-area/variants"
import { cn } from "@/utils/cn"

export type ScrollAreaProps = {
  classNames?: {
    base?: string
    viewport?: string
    content?: string
    scrollbar?: string
    thumb?: string
  }
} & BaseScrollArea.Root.Props &
  Pick<BaseScrollArea.Scrollbar.Props, "orientation">

export const ScrollArea = ({
  className,
  classNames,
  children,
  orientation,
  ...props
}: ScrollAreaProps) => {
  const styles = scrollArea({ orientation })

  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={cn(styles.base(), className, classNames?.base)}
      {...props}
    >
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className={cn(styles.viewport(), classNames?.viewport)}
      >
        <BaseScrollArea.Content
          data-slot="scroll-area-content"
          className={cn(styles.content(), classNames?.content)}
        >
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        data-slot="scroll-area-scrollbar"
        className={cn(styles.scrollbar(), classNames?.scrollbar)}
        orientation={orientation}
      >
        <BaseScrollArea.Thumb
          data-slot="scroll-area-thumb"
          className={cn(styles.thumb(), classNames?.thumb)}
        />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  )
}
