import { tv } from "tailwind-variants"

export const scrollArea = tv({
  slots: {
    base: "group box-border h-34 min-w-fit overflow-auto",
    viewport: "border-border h-full overscroll-contain rounded-md border",
    content: "px-4 py-3",
    scrollbar:
      "bg-muted relative m-1 flex w-1 justify-center rounded-md opacity-0 transition-all group-hover:opacity-100",
    thumb: "bg-muted-foreground w-full rounded-md",
  },
})
