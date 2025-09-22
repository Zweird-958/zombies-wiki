import z from "zod"

import { name } from "@/schemas/common"

const stepMark = z.object({
  type: z.enum(["bold", "underline"]),
})

export const StepContentSchema = z.object({
  type: z.literal("text"),
  text: z.string().trim().optional(),
  marks: z.array(stepMark).optional(),
})

export const StepParagraphSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(StepContentSchema).optional(),
})

export const CreateStepSchema = z.object({
  name,
  content: z
    .array(StepParagraphSchema)
    .min(1, "required")
    .refine(
      (val) =>
        val.some(
          (paragraph) => paragraph.content && paragraph.content.length > 0,
        ),
      "required",
    ),
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
