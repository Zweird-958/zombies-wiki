import { tv } from "tailwind-variants"

export const dropzone = tv({
  base: "border-input flex flex-col items-center gap-1 rounded-md border border-dashed p-4 text-sm hover:cursor-pointer",
  variants: {
    isDragActive: {
      true: "bg-muted/50 border-primary",
      false: "hover:border-primary",
    },
  },
})
