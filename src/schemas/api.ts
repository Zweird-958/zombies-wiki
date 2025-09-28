import z from "zod"

import { normalizeStep } from "@/api/utils/steps/normalize-step"
import { CreateGuideSchema } from "@/schemas/guides"
import { CreateStepSchema } from "@/schemas/steps"

const stepsStringify = z.preprocess((val) => {
  if (typeof val === "string") {
    const steps = JSON.parse(val) as z.infer<typeof CreateStepSchema>[]

    if (Array.isArray(steps)) {
      return steps.map((step) => normalizeStep({ step, option: "insert" }))
    }

    return []
  }

  return val
}, z.array(CreateStepSchema))

export const CreateGuideFormDataSchema = CreateGuideSchema.omit({
  steps: true,
}).and(z.object({ steps: stepsStringify }))
