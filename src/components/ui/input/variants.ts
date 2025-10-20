import { tv } from "tailwind-variants"

export const input = tv({
  base: [
    "flex h-9 w-full rounded-md bg-transparent px-2 py-1",
    "border-input border",
    "focused:ring focused:outline-none focused:ring-ring focused:border-ring",
    "transition-colors",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
  ],
})
