import type z from "zod"

import type {
  CreateStepSchema,
  StepContentSchema,
  StepParagraphSchema,
  markType,
  stepMark,
} from "@/schemas/steps"

export type CreateStep = z.infer<typeof CreateStepSchema>

export type MarkType = z.infer<typeof markType>

export type StepMark = z.infer<typeof stepMark>

export type StepContent = z.infer<typeof StepContentSchema>

export type StepParagraph = z.infer<typeof StepParagraphSchema>
