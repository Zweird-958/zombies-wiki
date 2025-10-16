import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion"
import { ChevronDown } from "lucide-react"

import { accordion } from "@/components/ui/accordion/variants"
import { cn } from "@/utils/cn"

export type AccordionProps = BaseAccordion.Root.Props

const styles = accordion()

export const Accordion = ({ className, ...props }: AccordionProps) => (
  <BaseAccordion.Root className={cn(styles.base(), className)} {...props} />
)

export type AccordionItemProps = BaseAccordion.Item.Props

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <BaseAccordion.Item className={cn(styles.item(), className)} {...props} />
)

export type AccordionHeaderProps = BaseAccordion.Header.Props

export const AccordionHeader = ({
  className,
  ...props
}: AccordionHeaderProps) => (
  <BaseAccordion.Header className={cn(styles.header(), className)} {...props} />
)

export type AccordionTriggerProps = BaseAccordion.Trigger.Props

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <BaseAccordion.Trigger className={cn(styles.trigger(), className)} {...props}>
    {children}
    <ChevronDown className={styles.triggerIcon()} />
  </BaseAccordion.Trigger>
)

export type AccordionPanelProps = BaseAccordion.Panel.Props

export const AccordionPanel = ({
  className,
  children,
  ...props
}: AccordionPanelProps) => (
  <BaseAccordion.Panel className={cn(styles.panel(), className)} {...props}>
    <div className="px-3 py-2">{children}</div>
  </BaseAccordion.Panel>
)
