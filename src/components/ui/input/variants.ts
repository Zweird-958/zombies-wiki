import { type VariantProps, tv } from "tailwind-variants"

export const input = tv({
  base: [
    "flex h-9 w-full bg-transparent px-2 py-1",
    "border-input border",
    "focused:ring focused:outline-none focused:ring-ring focused:border-ring",
    "placeholder:text-muted-foreground/70",
    "transition-colors",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
  ],
  variants: {
    radius: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
  },
  defaultVariants: {
    radius: "md",
    shadow: "sm",
  },
})

export type InputVariants = VariantProps<typeof input>
