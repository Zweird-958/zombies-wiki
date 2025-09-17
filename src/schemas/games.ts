import z from "zod"

import { image } from "@/schemas/images"

export const CreateGameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "required")
    .transform((text) => text.replace(/\s+/gu, " ")),
  image,
})
