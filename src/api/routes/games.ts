import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"
import { Hono } from "hono"

import { games } from "@/db/schemas/games"
import { CreateGameSchema } from "@/schemas/games"

const gamesApp = new Hono()
  .basePath("/games")
  .post(
    "/",
    zValidator("json", CreateGameSchema),
    async ({ req, var: { send, db, fail } }) => {
      const { name } = req.valid("json")

      const existingGames = await db
        .select({ name: games.name })
        .from(games)
        .where(eq(games.name, name))
        .limit(1)

      if (existingGames.length > 0) {
        return fail("CONFLICT", `${existingGames[0].name} already exists`)
      }

      const [game] = await db.insert(games).values({ name }).returning()

      return send(game)
    },
  )

export default gamesApp
