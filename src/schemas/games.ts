import z from "zod"

import { name } from "@/schemas/common"
import { image } from "@/schemas/images"

const releaseYear = z.coerce
  .number("invalid")
  .positive("invalid")
  .int("invalid")

export const CreateGameSchema = z.object({
  name,
  image,
  releaseYear,
})

export const GetGamesQueryParamsSchema = z.object({
  maps: z.coerce.boolean().optional(),
})

export const EditGameSchema = z.object({
  image: z.preprocess((val) => (val === "" ? null : val), image.nullish()),
  name: z.preprocess((val) => (val === "" ? null : val), name.nullish()),
  releaseYear: z.preprocess(
    (val) => (val === "" || val === "0" ? null : val),
    releaseYear.nullish(),
  ),
})
