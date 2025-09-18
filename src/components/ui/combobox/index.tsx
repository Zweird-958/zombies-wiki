"use client"

import { Combobox as BaseCombobox } from "@base-ui-components/react/combobox"
import { Check, ChevronDown } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/utils/cn"

export const Combobox = BaseCombobox.Root

export type ComboboxContainerProps = ComponentProps<"div">

export const ComboboxContainer = (props: ComboboxContainerProps) => (
  <div {...props} />
)

export type ComboboxTriggerProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.Trigger>,
  "className"
>

export const ComboboxTrigger = ({
  className,
  ...props
}: ComboboxTriggerProps) => (
  <BaseCombobox.Trigger
    className={cn(
      "border-input [&_svg]:text-muted-foreground relative w-full rounded-md border px-2 py-1 text-left transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-5",
      className,
    )}
    {...props}
  >
    <BaseCombobox.Value />
    <BaseCombobox.Icon className="justifty-center absolute top-0 right-2 flex h-full items-center">
      <ChevronDown />
    </BaseCombobox.Icon>
  </BaseCombobox.Trigger>
)

export type ComboboxInputProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.Input>,
  "className"
>

export const ComboboxInput = ({ className, ...props }: ComboboxInputProps) => (
  <BaseCombobox.Input
    className={cn(
      "border-input w-full rounded-md border px-2 py-1 outline-0 focus:ring-2",
      className,
    )}
    {...props}
  />
)

export type ComboboxSeparatorProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.Separator>,
  "className"
>

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxSeparatorProps) => (
  <BaseCombobox.Separator
    className={cn(
      "bg-popover-foreground my-2 rounded-md border-[0.1px]",
      className,
    )}
    {...props}
  />
)

export type ComboboxPopupProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.Popup>,
  "className"
>

export const ComboboxPopup = ({
  className,
  children,
  ...props
}: ComboboxPopupProps) => (
  <BaseCombobox.Portal>
    <BaseCombobox.Positioner className="outline-0" sideOffset={4}>
      <BaseCombobox.Popup
        className={cn(
          "bg-popover text-popover-foreground box-border max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] scroll-py-2 overflow-y-auto overscroll-contain rounded-md px-2 py-2 transition duration-100 ease-in-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 [&[data-empty]_[data-slot=empty]]:py-2",
          className,
        )}
        {...props}
      >
        {children}
      </BaseCombobox.Popup>
    </BaseCombobox.Positioner>
  </BaseCombobox.Portal>
)

export type ComboboxListProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.List>,
  "className"
>

export const ComboboxList = (props: ComboboxListProps) => (
  <BaseCombobox.List {...props} />
)

export type ComboboxItemProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.Item>,
  "className"
>

export const ComboboxItem = ({
  className,
  children,
  ...props
}: ComboboxItemProps) => (
  <BaseCombobox.Item
    className={cn(
      "data-[highlighted]:bg-popover-highlighted data-[highlighted]:text-popover-foreground text-muted-foreground box-border flex cursor-default items-center gap-2 rounded-md p-2 outline-none select-none [&_svg]:size-4",
      className,
    )}
    {...props}
  >
    <BaseCombobox.ItemIndicator>
      <Check />
    </BaseCombobox.ItemIndicator>
    <div>{children}</div>
  </BaseCombobox.Item>
)

export type ComboboxEmptyProps = { className?: string } & Omit<
  ComponentProps<typeof BaseCombobox.Empty>,
  "className"
>

export const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <BaseCombobox.Empty
    className={cn("cursor-not-allowed px-2 select-none", className)}
    data-slot="empty"
    {...props}
  />
)
