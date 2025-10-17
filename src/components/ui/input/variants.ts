import { tv } from "tailwind-variants"

export const input = tv({
  base: [
    "border-input rounded-md border px-2 py-1",
    "focus:ring focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-disabled",
  ],
})
