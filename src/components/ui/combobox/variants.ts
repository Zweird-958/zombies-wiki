import { type VariantProps, tv } from "tailwind-variants"

export const combobox = tv({
  slots: {
    trigger: [
      "svg:text-muted-foreground svg-not-size:size-5",
      "disabled:opacity-disabled disabled:cursor-not-allowed",
    ],
    icon: "",
    input: "",
    inputWrapper: "svg-not-size:size-4 text-muted-foreground",
    separator: "border-border my-2 rounded-md border-[0.1px]",
    popup: [
      "border-border border",
      "bg-popover text-popover-foreground scroll-py-2 overflow-y-auto overscroll-contain rounded-md py-2",
      "max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)]",
      "starting-style:scale-95 starting-style:opacity-0 ending-style:scale-95 ending-style:opacity-0 transition duration-100 ease-in-out",
      "[&[data-empty]_[data-slot=combobox-empty]]:py-2",
    ],
    item: [
      "highlighted:bg-accent highlighted:text-accent-foreground",
      "p-2 text-sm",
      "cursor-pointer outline-none select-none",
      "svg-not-size:size-4 flex items-center gap-2 rounded-md",
    ],
    itemList: "px-2",
    empty: "cursor-not-allowed px-4 text-sm select-none",
    groupLabel: "text-muted-foreground px-1 py-2 text-xs",
    chips: "flex w-64 flex-wrap items-center gap-0.5",
    chip: [
      "bg-background text-foreground border-border border",
      "flex cursor-default items-center gap-1 rounded-md px-1.5 py-[0.2rem] text-sm outline-none",
    ],
    chipRemove: [
      "svg-not-size:size-4",
      "text-muted-foreground hover:text-foreground transition-colors",
    ],
  },
  variants: {
    placement: {
      inside: {
        inputWrapper: "flex items-center gap-2 px-4",
        trigger: [
          "border-input h-9 min-w-42 border outline-none",
          "focused:ring focused:ring-ring focused:border-ring",
          "pressed:ring pressed:ring-ring pressed:border-ring",
          "relative w-full rounded-md py-1 pr-6 pl-2 text-left transition-all",
          "active:not-disabled:scale-[0.98]",
          "text-muted-foreground truncate pr-7",
        ],
        icon: "justifty-center absolute top-0 right-2 flex h-full items-center",
        input: [
          "border-input",
          "h-6 w-full rounded-md px-2 py-1 outline-none",
          "placeholder:text-muted-foreground/70",
        ],
      },
      outside: {
        inputWrapper: "relative",
        trigger: "absolute right-2 bottom-0 h-full items-center justify-center",
        input: "pr-7",
        chips: [
          "has-[&[data-slot=combobox-input]:focus]:ring-ring has-[&[data-slot=combobox-input]:focus]:border-ring has-[&[data-slot=combobox-input]:focus]:ring",
          "border-border rounded-md border px-1.5 py-1",
        ],
      },
    },
    multiple: {
      true: {
        input: "min-w-12 flex-1 rounded-md bg-transparent pl-1.5 outline-none",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      placement: "inside",
      multiple: true,
      className: {
        trigger: "h-fit",
      },
    },
  ],
})

export type ComboboxVariants = VariantProps<typeof combobox>
