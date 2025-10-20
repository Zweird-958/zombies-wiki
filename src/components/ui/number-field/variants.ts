import { type VariantProps, tv } from "tailwind-variants"

export const numberField = tv({
  slots: {
    base: [
      "flex flex-col gap-2",
      "disabled:opacity-disabled disabled:*:cursor-not-allowed [&_:disabled]:cursor-not-allowed",
    ],
    group: [
      "transition-colors",
      "svg-not-size:size-4 flex",
      "not-has-aria-invalid:has-number-field-input-focused:ring-ring has-number-field-input-focused:ring not-has-aria-invalid:has-number-field-input-focused:border-ring",
      "focused:ring not-has-aria-invalid:focused:ring-ring not-has-aria-invalid:focused:border-ring",
      "button:border-input button:p-2 button:border button:h-[inherit]",
      "button:flex button:items-center button:justify-center",
      "button:not-disabled:hover:bg-accent button:not-disabled:hover:text-accent-foreground",
      "button:bg-transparent button:aspect-square",
      "has-aria-invalid:button:border-danger has-aria-invalid:ring-danger/50",
    ],
    input: [
      "border-input",
      "placeholder:text-muted-foreground/70 flex-1 px-2 py-1 text-center tabular-nums",
      "focused:outline-none not-aria-invalid:focused:ring not-aria-invalid:focused:ring-ring not-aria-invalid:focused:border-ring z-[1]",
      "aria-invalid:border-danger aria-invalid:ring-danger/50",
    ],
    scrubArea: "*:cursor-ew-resize",
    scrubAreaCursor: "text-input svg-not-size:size-4",
  },
  variants: {
    isGroup: {
      true: {
        input: "border-t border-b",
        group: "h-9",
      },
      false: {
        input: "h-9 border",
      },
    },
    radius: {
      none: "",
      sm: {
        group:
          "number-field-decrement:rounded-l-sm number-field-increment:rounded-r-sm rounded-sm",
      },
      md: {
        group:
          "number-field-decrement:rounded-l-md number-field-increment:rounded-r-md rounded-md",
      },
      lg: {
        group:
          "number-field-decrement:rounded-l-lg number-field-increment:rounded-r-lg rounded-lg",
      },
      full: {
        group:
          "number-field-decrement:rounded-l-full number-field-increment:rounded-r-full rounded-full",
      },
    },
  },
  compoundVariants: [
    {
      isGroup: false,
      radius: "sm",
      className: {
        input: "rounded-sm",
      },
    },
    {
      isGroup: false,
      radius: "md",
      className: {
        input: "rounded-md",
      },
    },
    {
      isGroup: false,
      radius: "lg",
      className: {
        input: "rounded-lg",
      },
    },
    {
      isGroup: false,
      radius: "full",
      className: {
        input: "rounded-full",
      },
    },
  ],
  defaultVariants: {
    radius: "md",
  },
})

export type NumberFieldVariants = VariantProps<typeof numberField>
