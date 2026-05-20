import z from "zod"

import { id, name } from "@/schemas/common"
import { image } from "@/schemas/images"
import { CreateStepSchema, EditStepSchema } from "@/schemas/steps"

export const CreateGuideSchema = z.object({
  name,
  mapId: id,
  image,
  steps: z.array(CreateStepSchema).min(1, "required"),
})

export const GetGuideSchema = z.object({
  id,
})

export const EditGuideSchema = z.object({
  name: z.preprocess((val) => (val === "" ? null : val), name.nullish()),
  image: z.preprocess((val) => (val === "" ? null : val), image.nullish()),
  mapId: z.preprocess((val) => (val === "" ? null : val), id.nullish()),
  steps: z.array(EditStepSchema).min(1, "required"),
})
