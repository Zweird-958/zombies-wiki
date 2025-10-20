import { tv } from "tailwind-variants"

export const numberField = tv({
  slots: {
    base: [
      "flex flex-col gap-2",
      "disabled:opacity-disabled disabled:*:cursor-not-allowed [&_:disabled]:cursor-not-allowed",
    ],
    group: [
      "transition-colors",
      "svg-not-size:size-4 flex rounded-md",
      "has-number-field-input-focused:ring-ring has-number-field-input-focused:ring has-number-field-input-focused:border-ring",
      "focused:ring focused:ring-ring focused:border-ring",
      "button:border-input button:p-2 button:border button:h-[inherit]",
      "button:flex button:items-center button:justify-center",
      "button:not-disabled:hover:bg-accent button:not-disabled:hover:text-accent-foreground",
      "button:data-[slot=number-field-decrement]:rounded-l-md button:data-[slot=number-field-increment]:rounded-r-md",
      "button:bg-transparent button:aspect-square",
    ],
    input: [
      "border-input",
      "placeholder:text-muted-foreground/70 flex-1 px-2 py-1 text-center tabular-nums",
      "focused:outline-none focused:ring focused:ring-ring focused:border-ring z-[1]",
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
        input: "h-9 rounded-md border",
      },
    },
  },
})
