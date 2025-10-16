import { tv } from "tailwind-variants"

export const label = tv({
  base: [
    "text-primary block leading-none font-medium transition-opacity select-none",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-disabled",
    "has-[+input:is(:disabled)]:opacity-disabled has-[+input:is(:disabled)]:cursor-not-allowed",
  ],
})
