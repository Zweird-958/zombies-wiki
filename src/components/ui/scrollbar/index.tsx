import { ScrollArea as BaseScrollArea } from "@base-ui-components/react/scroll-area"
import type { ComponentProps } from "react"

import type { OmitClassName } from "@/types/ui"
import { cn } from "@/utils/cn"

export type ScrollAreaProps = OmitClassName<
  ComponentProps<typeof BaseScrollArea.Root>
>

export const ScrollArea = ({
  className,
  children,
  ...props
}: ScrollAreaProps) => (
  <BaseScrollArea.Root
    data-slot="scroll-area"
    className={cn("group box-border h-34 min-w-fit overflow-auto", className)}
    {...props}
  >
    <BaseScrollArea.Viewport
      data-slot="scroll-area-viewport"
      className="border-border h-full overscroll-contain rounded-md border"
    >
      <BaseScrollArea.Content
        data-slot="scroll-area-content"
        className="px-4 py-3"
      >
        {children}
      </BaseScrollArea.Content>
    </BaseScrollArea.Viewport>
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      className="bg-muted relative my-1 flex w-1 justify-center rounded-md opacity-0 transition-all group-hover:opacity-100"
    >
      <BaseScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="bg-muted-foreground w-full rounded-md"
      />
    </BaseScrollArea.Scrollbar>
  </BaseScrollArea.Root>
)
