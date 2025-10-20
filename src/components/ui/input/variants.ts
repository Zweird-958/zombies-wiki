import { tv } from "tailwind-variants"

export const input = tv({
  base: [
    "border-input rounded-md border px-2 py-1",
    "focused:ring focused:outline-none",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
  ],
})
