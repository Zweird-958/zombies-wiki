import type z from "zod"

import type {
  CreateStepSchema,
  StepContentSchema,
  StepParagraphSchema,
} from "@/schemas/steps"

export type CreateStep = z.infer<typeof CreateStepSchema>

export type StepContent = z.infer<typeof StepContentSchema>

export type StepParagraph = z.infer<typeof StepParagraphSchema>
