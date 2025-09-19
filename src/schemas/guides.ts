import z from "zod"

import { name } from "@/schemas/common"
import { CreateStepSchema } from "@/schemas/steps"

export const CreateGuideSchema = z.object({
  name,
  gameId: z.string().min(1, "required").uuid(),
  steps: z.array(CreateStepSchema).min(1, "required"),
})
