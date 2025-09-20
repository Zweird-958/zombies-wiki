import z from "zod"

import { name } from "@/schemas/common"

export const CreateStepSchema = z.object({
  name,
  content: z
    .string()
    .min(1, "required")
    .refine((val) => val.trim() !== "<p></p>", {
      message: "required",
    }),
})

export const stepsStringify = z.preprocess((val) => {
  if (typeof val === "string") {
    const steps = JSON.parse(val) as z.infer<typeof CreateStepSchema>[]

    if (Array.isArray(steps)) {
      return steps
    }

    return []
  }

  return val
}, z.array(CreateStepSchema))
