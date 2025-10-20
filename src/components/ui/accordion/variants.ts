import { tv } from "tailwind-variants"

export const accordion = tv({
  slots: {
    base: [
      "flex max-w-[calc(100vw-8rem)] min-w-96 flex-col justify-center",
      "disabled:opacity-disabled disabled:cursor-not-allowed",
    ],
    item: "border-border border-b",
    header: "m-0",
    trigger: [
      "relative z-10 flex w-full items-baseline justify-between gap-4 px-3 py-2 pr-1 text-left text-base leading-6 font-medium outline-none",
      "[&[data-panel-open]>svg]:rotate-180",
      "disabled:cursor-not-allowed",
    ],
    triggerIcon: [
      "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5",
      "transition-transform duration-500",
    ],
    panel: [
      "box-border h-[var(--accordion-panel-height)] overflow-hidden text-base leading-6",
      "ending-style:h-0 starting-style:h-0 transition-[height] duration-500 ease-out",
    ],
  },
})
