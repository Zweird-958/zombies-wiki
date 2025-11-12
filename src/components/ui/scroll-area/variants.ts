import { tv } from "tailwind-variants"

export const scrollArea = tv({
  slots: {
    base: "group box-border overflow-auto",
    viewport:
      "border-border h-full w-full overscroll-contain rounded-md border",
    content: "px-4 py-3",
    scrollbar:
      "bg-muted relative m-1 flex justify-center rounded-md opacity-0 transition-all group-hover:opacity-100",
    thumb: "bg-muted-foreground w-full rounded-md",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "min-h-fit w-64",
        content: "flex gap-0.5",
        scrollbar: "h-1",
      },
      vertical: {
        base: "h-34 min-w-fit",
        scrollbar: "w-1",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})
