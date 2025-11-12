import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area"

import { scrollArea } from "@/components/ui/scroll-area/variants"
import { cn } from "@/utils/cn"

export type ScrollAreaProps = BaseScrollArea.Root.Props &
  Pick<BaseScrollArea.Scrollbar.Props, "orientation">

export const ScrollArea = ({
  className,
  children,
  orientation,
  ...props
}: ScrollAreaProps) => {
  const styles = scrollArea({ orientation })

  return (
    <BaseScrollArea.Root
      data-slot="scroll-area"
      className={cn(styles.base(), className)}
      {...props}
    >
      <BaseScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className={styles.viewport()}
      >
        <BaseScrollArea.Content
          data-slot="scroll-area-content"
          className={styles.content()}
        >
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        data-slot="scroll-area-scrollbar"
        className={styles.scrollbar()}
        orientation={orientation}
      >
        <BaseScrollArea.Thumb
          data-slot="scroll-area-thumb"
          className={styles.thumb()}
        />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  )
}
