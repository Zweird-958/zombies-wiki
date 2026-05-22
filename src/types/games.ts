import type z from "zod"

import type { formatSingleGame } from "@/api/utils/games/format-game"
import type { CreateGameSchema, EditGameSchema } from "@/schemas/games"
import type { getGame } from "@/utils/games/get-game"

export type CreateGame = z.infer<typeof CreateGameSchema>

export type EditGame = z.infer<typeof EditGameSchema>

export type Game = NonNullable<Awaited<ReturnType<typeof getGame>>>

export type FormattedGame = ReturnType<typeof formatSingleGame>
