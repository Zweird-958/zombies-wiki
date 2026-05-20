import z from "zod"

import { normalizeStep } from "@/api/utils/steps/normalize-step"
import { CreateGuideSchema, EditGuideSchema } from "@/schemas/guides"
import { CreateStepSchema, EditStepSchema } from "@/schemas/steps"

const formatSteps = (val: unknown) => {
  if (typeof val === "string") {
    const steps = JSON.parse(val) as z.infer<typeof CreateStepSchema>[]

    if (Array.isArray(steps)) {
      return steps.map((step) => normalizeStep({ step, option: "insert" }))
    }

    return []
  }

  return val
}

const createStepsStringify = z.preprocess(
  formatSteps,
  z.array(CreateStepSchema),
)
const editStepsStringify = z.preprocess(formatSteps, z.array(EditStepSchema))

export const CreateGuideFormDataSchema = CreateGuideSchema.omit({
  steps: true,
}).and(
  z.object({
    steps: createStepsStringify,
  }),
)

export const EditGuideFormDataSchema = EditGuideSchema.omit({
  steps: true,
}).and(
  z.object({
    steps: editStepsStringify,
  }),
)
