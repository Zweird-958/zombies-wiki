import { type VariantProps, tv } from "tailwind-variants"

export const card = tv({
  slots: {
    base: "bg-card text-card-foreground flex flex-col gap-3 h-fit rounded-md border border-border py-6 shadow-sm",
    header:
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
    title: "leading-none font-semibold",
    description: "text-muted-foreground text-sm",
    action: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
    content: "px-6",
    footer: "flex items-center px-6 [.border-t]:pt-6",
  },
})

export type CardVariants = VariantProps<typeof card>
