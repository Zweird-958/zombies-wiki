import { type VariantProps, tv } from "tailwind-variants"

export const input = tv({
  base: [
    "flex h-9 w-full bg-transparent px-2 py-1",
    "border-input border",
    "focused:ring focused:outline-none not-aria-invalid:focused:ring-ring not-aria-invalid:focused:border-ring",
    "placeholder:text-muted-foreground/70",
    "transition-[color,box-shadow]",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
    "aria-invalid:border-danger aria-invalid:ring-danger/50",
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
  compoundVariants: [
    {
      shadow: ["sm", "md", "lg"],
      className: "aria-invalid:shadow-danger/20",
    },
  ],
  defaultVariants: {
    radius: "md",
    shadow: "sm",
  },
})

export type InputVariants = VariantProps<typeof input>
