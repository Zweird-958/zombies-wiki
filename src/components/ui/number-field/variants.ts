import { tv } from "tailwind-variants"

export const numberField = tv({
  slots: {
    base: [
      "flex flex-col gap-2",
      "disabled:opacity-disabled [&_:disabled]:cursor-not-allowed disabled:*:cursor-not-allowed",
    ],
    group: [
      "svg-not-size:size-4 flex",
      "rounded-md has-[&[data-slot=number-field-input]:focus]:ring focused:ring",
      "button:border-input button:p-2 button:border",
      "button:flex button:items-center button:justify-center",
      "button:text-accent-foreground button:bg-accent",
      "button:data-[slot=number-field-decrement]:rounded-l-md button:data-[slot=number-field-increment]:rounded-r-md",
    ],
    input: [
      "border-input",
      "flex-1 px-2 py-1 text-center tabular-nums",
      "focused:outline-none focused:ring focused:z-[1]",
    ],
    scrubArea: "*:cursor-ew-resize",
    scrubAreaCursor: "text-input svg-not-size:size-4",
  },
  variants: {
    isGroup: {
      true: {
        input: "border-t border-b",
      },
      false: {
        input: "rounded-md border",
      },
    },
  },
})
