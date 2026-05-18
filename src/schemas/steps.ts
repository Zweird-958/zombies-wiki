import z from "zod"

import { name } from "@/schemas/common"

export const markType = z.enum(["bold", "underline", "image"])

const imageMark = z.object({
  type: z.literal("image"),
  attrs: z.object({
    imageUrl: z.string(),
  }),
})

const commonMark = z.object({
  type: z.enum(markType.options.filter((o) => o !== "image")),
})

export const stepMark = commonMark.or(imageMark)

export const StepContentSchema = z.object({
  type: z.literal("text"),
  text: z.string().optional(),
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
