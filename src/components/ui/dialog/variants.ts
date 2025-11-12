import { tv } from "tailwind-variants"

export const dialog = tv({
  slots: {
    backdrop: [
      "starting-style:opacity-0 ending-style:opacity-0 transition-all duration-150",
      "fixed inset-0 bg-black opacity-70",
    ],
    popup: [
      "bg-popover text-popover-foreground border-border max-w-[calc(100vw-3rem)] min-w-96 rounded-lg border p-6",
      "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
      "starting-style:scale-90 starting-style:opacity-0 ending-style:scale-90 ending-style:opacity-0 transition-all duration-150",
    ],
    close: [
      "absolute top-4 right-4 rounded-full opacity-70 outline-0 transition-opacity hover:opacity-100",
      "svg-not-size:size-4 svg:pointer-events-none svg:shrink-0",
      "disabled:pointer-events-none",
    ],
    content: "flex max-h-[500px] pt-2",
    title: "text-lg font-medium",
    description: "text-muted-foreground text-sm",
  },
})
