import { tv } from "tailwind-variants"

export const input = tv({
  base: [
    "border-input rounded-md border bg-transparent px-2 py-1",
    "focused:ring focused:outline-none focused:ring-ring focused:border-ring",
    "transition-colors",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
  ],
})
