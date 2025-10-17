import { tv } from "tailwind-variants"

export const toolbar = tv({
  slots: {
    base: [
      "border-border flex w-fit gap-1 rounded-md border p-0.5",
      "disabled:opacity-disabled disabled:cursor-not-allowed disabled:**:cursor-not-allowed",
    ],
    group: "flex gap-0.5",
    button:
      "hover:not-disabled:bg-accent hover:not-disabled:text-accent-foreground rounded-md px-2",
    separator: "bg-border my-1 min-h-full w-[1px] rounded-md",
  },
})
