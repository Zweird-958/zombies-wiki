import { type VariantProps, tv } from "tailwind-variants"

export const toggle = tv({
  base: [
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap",
    "transition-[color,box-shadow]",
    "pressed:bg-accent pressed:text-accent-foreground",
    "svg:pointer-events-none svg-not-size:size-4 svg:shrink-0",
    "focused:ring outline-none",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      default:
        "hover:not-disabled:bg-muted hover:not-disabled:text-muted-foreground bg-transparent",
      outline: [
        "border-input border bg-transparent shadow-xs",
        "hover:not-disabled:bg-accent hover:not-disabled:text-accent-foreground",
      ],
    },
    size: {
      default: "h-9 min-w-9 px-2",
      sm: "h-8 min-w-8 px-1.5",
      lg: "h-10 min-w-10 px-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export type ToggleVariants = VariantProps<typeof toggle>
