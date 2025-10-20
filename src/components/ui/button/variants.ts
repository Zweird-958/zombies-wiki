import { type VariantProps, tv } from "tailwind-variants"

export const button = tv({
  base: [
    "flex size-fit items-center justify-center gap-2 px-4 py-2 whitespace-nowrap transition-all outline-none",
    "disabled:opacity-disabled disabled:cursor-not-allowed",
    "focused:ring",
    "active:not-disabled:scale-95",
    "svg-not-size:size-4 svg:shrink-0",
  ],
  variants: {
    color: {
      primary: "ring-primary/50",
      secondary: "ring-secondary/50",
      success: "ring-success/50",
      danger: "ring-danger/50",
      warning: "ring-warning/50",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
      icon: "p-2",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    variant: {
      outline: "border",
      solid: "",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-3 py-1",
    },
    {
      color: "primary",
      variant: "outline",
      class: "text-primary border-primary",
    },
    {
      color: "secondary",
      variant: "outline",
      class: "text-secondary border-secondary",
    },
    {
      color: "success",
      variant: "outline",
      class: "text-success border-success",
    },
    {
      color: "danger",
      variant: "outline",
      class: "text-danger border-danger",
    },
    {
      color: "warning",
      variant: "outline",
      class: "text-warning border-warning",
    },
    {
      color: "primary",
      variant: "solid",
      class: "bg-primary text-primary-foreground",
    },
    {
      color: "secondary",
      variant: "solid",
      class: "bg-secondary text-secondary-foreground",
    },
    {
      color: "success",
      variant: "solid",
      class: "bg-success text-success-foreground",
    },
    {
      color: "danger",
      variant: "solid",
      class: "bg-danger text-danger-foreground",
    },
    {
      color: "warning",
      variant: "solid",
      class: "bg-warning text-warning-foreground",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    radius: "md",
    variant: "solid",
  },
})

export type ButtonVariants = VariantProps<typeof button>
