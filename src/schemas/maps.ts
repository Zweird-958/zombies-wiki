import z from "zod"

import { id, name } from "@/schemas/common"
import { image } from "@/schemas/images"

export const CreateMapSchema = z.object({
  name,
  image,
  gameId: id,
})
