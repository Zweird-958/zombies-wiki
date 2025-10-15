import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/utils/cn"

export type AccordionProps = BaseAccordion.Root.Props

export const Accordion = ({ className, ...props }: AccordionProps) => (
  <BaseAccordion.Root
    className={cn(
      "flex max-w-[calc(100vw-8rem)] min-w-96 flex-col justify-center",
      className,
    )}
    {...props}
  />
)

export type AccordionItemProps = BaseAccordion.Item.Props

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <BaseAccordion.Item
    className={cn("border-border border-b", className)}
    {...props}
  />
)

export type AccordionHeaderProps = BaseAccordion.Header.Props

export const AccordionHeader = ({
  className,
  ...props
}: AccordionHeaderProps) => (
  <BaseAccordion.Header className={cn("m-0", className)} {...props} />
)

export type AccordionTriggerProps = BaseAccordion.Trigger.Props

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <BaseAccordion.Trigger
    className={cn(
      "relative z-10 flex w-full items-baseline justify-between gap-4 px-3 py-2 pr-1 text-left text-base leading-6 font-medium outline-none [&[data-panel-open]>svg]:rotate-180",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-500" />
  </BaseAccordion.Trigger>
)

export type AccordionPanelProps = BaseAccordion.Panel.Props

export const AccordionPanel = ({
  className,
  ...props
}: AccordionPanelProps) => (
  <BaseAccordion.Panel
    className={cn(
      "ending-style:h-0 starting-style:h-0 box-border h-[var(--accordion-panel-height)] overflow-hidden text-base leading-6 transition-[height] duration-500 ease-out",
      className,
    )}
    {...props}
  />
)
