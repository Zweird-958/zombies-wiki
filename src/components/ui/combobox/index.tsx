"use client"

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox"
import { Check, ChevronDown, Search } from "lucide-react"

import { combobox } from "@/components/ui/combobox/variants"
import { cn } from "@/utils/cn"

const styles = combobox()

export type ComboboxProps<
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
> = BaseCombobox.Root.Props<ItemValue, SelectedValue, Multiple>

export const Combobox = BaseCombobox.Root

export type ComboboxTriggerProps = BaseCombobox.Trigger.Props

export const ComboboxTrigger = ({
  className,
  ...props
}: ComboboxTriggerProps) => (
  <BaseCombobox.Trigger className={cn(styles.trigger(), className)} {...props}>
    <BaseCombobox.Value />
    <BaseCombobox.Icon className={styles.icon()}>
      <ChevronDown />
    </BaseCombobox.Icon>
  </BaseCombobox.Trigger>
)

export type ComboboxInputProps = BaseCombobox.Input.Props

export const ComboboxInput = ({ className, ...props }: ComboboxInputProps) => (
  <div className={cn(styles.inputWrapper())}>
    <Search />
    <BaseCombobox.Input className={cn(styles.input(), className)} {...props} />
  </div>
)

export type ComboboxSeparatorProps = BaseCombobox.Separator.Props

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxSeparatorProps) => (
  <BaseCombobox.Separator
    className={cn(styles.separator(), className)}
    {...props}
  />
)

export type ComboboxPopupProps = BaseCombobox.Popup.Props

export const ComboboxPopup = ({
  className,
  children,
  ...props
}: ComboboxPopupProps) => (
  <BaseCombobox.Portal>
    <BaseCombobox.Positioner className="outline-0" sideOffset={4}>
      <BaseCombobox.Popup className={cn(styles.popup(), className)} {...props}>
        {children}
      </BaseCombobox.Popup>
    </BaseCombobox.Positioner>
  </BaseCombobox.Portal>
)

export type ComboboxListProps = BaseCombobox.List.Props

export const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <BaseCombobox.List className={cn(styles.itemList(), className)} {...props} />
)

export type ComboboxItemProps = BaseCombobox.Item.Props

export const ComboboxItem = ({
  className,
  children,
  ...props
}: ComboboxItemProps) => (
  <BaseCombobox.Item className={cn(styles.item(), className)} {...props}>
    <BaseCombobox.ItemIndicator>
      <Check />
    </BaseCombobox.ItemIndicator>
    <div>{children}</div>
  </BaseCombobox.Item>
)

export type ComboboxEmptyProps = BaseCombobox.Empty.Props

export const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <BaseCombobox.Empty
    className={cn(styles.empty(), className)}
    data-slot="empty"
    {...props}
  />
)

export type ComboboxGroupProps = BaseCombobox.Group.Props

export const ComboboxGroup = BaseCombobox.Group

export type ComboboxGroupLabelProps = BaseCombobox.GroupLabel.Props

export const ComboboxGroupLabel = ({
  className,
  ...props
}: ComboboxGroupLabelProps) => (
  <BaseCombobox.GroupLabel
    className={cn(styles.groupLabel(), className)}
    {...props}
  />
)
