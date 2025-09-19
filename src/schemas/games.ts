import z from "zod"

import { name } from "@/schemas/common"
import { image } from "@/schemas/images"

export const CreateGameSchema = z.object({
  name,
  image,
  releaseYear: z.coerce.number("invalid").positive("invalid").int("invalid"),
})

export const GetGamesQueryParamsSchema = z.object({
  maps: z.coerce.boolean().optional(),
})
