import z from "zod"

import { id, name } from "@/schemas/common"
import { image } from "@/schemas/images"
import { CreateStepSchema } from "@/schemas/steps"

export const CreateGuideSchema = z.object({
  name,
  mapId: id,
  image,
  steps: z.array(CreateStepSchema).min(1, "required"),
})

export const GetGuideSchema = z.object({
  id,
})
