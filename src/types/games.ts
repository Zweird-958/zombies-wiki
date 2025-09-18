import type z from "zod"

import type { CreateGameSchema } from "@/schemas/games"

export type CreateGame = z.infer<typeof CreateGameSchema>

export type Game = {
  id: string
  name: string
  normalizedName: string
  image: string
}
