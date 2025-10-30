"use client"

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox"
import { Check, ChevronDown, Search } from "lucide-react"

import {
  ComboboxProvider,
  type ComboboxProviderProps,
  useCombobox,
} from "@/components/ui/combobox/context"
import { input } from "@/components/ui/input/variants"
import { cn } from "@/utils/cn"

export type ComboboxProps<
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
> = BaseCombobox.Root.Props<ItemValue, SelectedValue, Multiple> &
  Omit<ComboboxProviderProps, "children">

export const Combobox = <
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
>({
  inputPlacement,
  ...props
}: ComboboxProps<ItemValue, SelectedValue, Multiple>) => (
  <ComboboxProvider inputPlacement={inputPlacement}>
    <BaseCombobox.Root {...props} />
  </ComboboxProvider>
)

export type ComboboxTriggerProps = BaseCombobox.Trigger.Props

export const ComboboxTrigger = ({
  className,
  children,
  ...props
}: ComboboxTriggerProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.Trigger
      className={cn(styles.trigger(), className)}
      {...props}
    >
      {children}
      <BaseCombobox.Icon className={styles.icon()}>
        <ChevronDown />
      </BaseCombobox.Icon>
    </BaseCombobox.Trigger>
  )
}

export type ComboboxValueProps = BaseCombobox.Value.Props

export const ComboboxValue = BaseCombobox.Value

export type ComboboxInputProps = BaseCombobox.Input.Props

export const ComboboxInput = ({ className, ...props }: ComboboxInputProps) => {
  const { styles, inputPlacement: placement } = useCombobox()

  if (placement === "outside") {
    return (
      <div className={cn(styles.inputWrapper())}>
        <BaseCombobox.Input
          className={cn(input(), styles.input(), className)}
          {...props}
        />
        <ComboboxTrigger />
      </div>
    )
  }

  return (
    <div className={cn(styles.inputWrapper())}>
      <Search />
      <BaseCombobox.Input
        className={cn(styles.input(), className)}
        {...props}
      />
    </div>
  )
}

export type ComboboxSeparatorProps = BaseCombobox.Separator.Props

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxSeparatorProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.Separator
      className={cn(styles.separator(), className)}
      {...props}
    />
  )
}

export type ComboboxPopupProps = BaseCombobox.Popup.Props

export const ComboboxPopup = ({
  className,
  children,
  ...props
}: ComboboxPopupProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner className="outline-0" sideOffset={4}>
        <BaseCombobox.Popup
          className={cn(styles.popup(), className)}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

export type ComboboxListProps = BaseCombobox.List.Props

export const ComboboxList = ({ className, ...props }: ComboboxListProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.List
      className={cn(styles.itemList(), className)}
      {...props}
    />
  )
}

export type ComboboxItemProps = BaseCombobox.Item.Props

export const ComboboxItem = ({
  className,
  children,
  ...props
}: ComboboxItemProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.Item className={cn(styles.item(), className)} {...props}>
      <BaseCombobox.ItemIndicator>
        <Check />
      </BaseCombobox.ItemIndicator>
      <div>{children}</div>
    </BaseCombobox.Item>
  )
}

export type ComboboxEmptyProps = BaseCombobox.Empty.Props

export const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.Empty
      className={cn(styles.empty(), className)}
      data-slot="empty"
      {...props}
    />
  )
}

export type ComboboxGroupProps = BaseCombobox.Group.Props

export const ComboboxGroup = BaseCombobox.Group

export type ComboboxGroupLabelProps = BaseCombobox.GroupLabel.Props

export const ComboboxGroupLabel = ({
  className,
  ...props
}: ComboboxGroupLabelProps) => {
  const { styles } = useCombobox()

  return (
    <BaseCombobox.GroupLabel
      className={cn(styles.groupLabel(), className)}
      {...props}
    />
  )
}
