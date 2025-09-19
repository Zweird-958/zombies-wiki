import z from "zod"

import { id, name } from "@/schemas/common"
import { CreateStepSchema } from "@/schemas/steps"

export const CreateGuideSchema = z.object({
  name,
  mapId: id,
  steps: z.array(CreateStepSchema).min(1, "required"),
})

export const GetGuideSchema = z.object({
  id,
})
