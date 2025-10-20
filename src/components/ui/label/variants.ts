import { tv } from "tailwind-variants"

export const label = tv({
  base: [
    "text-primary block leading-none font-medium transition-opacity select-none",
    "peer-disabled:opacity-disabled peer-disabled:cursor-not-allowed",
    "has-[+input:is(:disabled)]:opacity-disabled has-[+input:is(:disabled)]:cursor-not-allowed",
  ],
})
