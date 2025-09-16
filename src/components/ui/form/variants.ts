import { tv } from "tailwind-variants"

export const form = tv({
  slots: {
    root: "flex flex-col gap-2",
    label: "data-[error=true]:text-danger transition-colors",
    description: "text-muted-foreground text-sm",
    error: "text-danger text-sm",
    input:
      "rounded-md border px-2 py-1 focus:ring focus:outline-none border-input",
  },
})
