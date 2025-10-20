import { tv } from "tailwind-variants"

export const combobox = tv({
  slots: {
    trigger: [
      "border-input relative w-full rounded-md border px-2 py-1 text-left transition-all",
      "svg:text-muted-foreground svg-not-size:size-5",
      "disabled:opacity-disabled disabled:cursor-not-allowed",
      "active:not-disabled:scale-[0.98]",
    ],
    icon: "justifty-center absolute top-0 right-2 flex h-full items-center",
    input:
      "border-input w-full rounded-md border px-2 py-1 outline-0 focus:ring-2",
    separator: "bg-popover-foreground my-2 rounded-md border-[0.1px]",
    popup: [
      "bg-popover text-popover-foreground box-border scroll-py-2 overflow-y-auto overscroll-contain rounded-md px-2 py-2",
      "max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)]",
      "starting-style:scale-95 starting-style:opacity-0 ending-style:scale-95 ending-style:opacity-0 transition duration-100 ease-in-out",
      "[&[data-empty]_[data-slot=empty]]:py-2",
    ],
    item: [
      "highlighted:bg-accent highlighted:text-accent-foreground",
      "text-muted-foreground svg-not-size:size-4 box-border flex cursor-pointer items-center gap-2 rounded-md p-2 outline-none select-none",
    ],
    empty: "cursor-not-allowed px-2 select-none",
    groupLabel: "px-0.5 py-2",
  },
})
