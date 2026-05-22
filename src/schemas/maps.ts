import z from "zod"

import { id, name } from "@/schemas/common"
import { image } from "@/schemas/images"

export const CreateMapSchema = z.object({
  name,
  image,
  gameId: id,
})

export const EditMapSchema = z.object({
  image: z.preprocess((val) => (val === "" ? null : val), image.nullish()),
  name: z.preprocess((val) => (val === "" ? null : val), name.nullish()),
  gameId: z.preprocess((val) => (val === "" ? null : val), id.nullish()),
})
