import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGame, formatSingleGame } from "@/api/utils/games/format-game"
import { isGameExists } from "@/api/utils/games/is-game-exists"
import { normalizeName } from "@/api/utils/normalize-name"
import { uploadImage } from "@/api/utils/upload-image"
import { games } from "@/db/schemas/games"
import { gamesWithMaps } from "@/db/views"
import { CreateGameSchema, GetGamesQueryParamsSchema } from "@/schemas/games"

export const gamesApp = new Hono()
  .basePath("/games")
  .post(
    "/",
    zValidator("form", CreateGameSchema),
    ...isAuthorized({ games: ["create"] }),
    async ({ req, var: { send, db, fail } }) => {
      const { name, image, releaseYear } = req.valid("form")

      const normalizedName = normalizeName(name)

      if (await isGameExists(normalizedName, db)) {
        return fail("CONFLICT", `${name} already exists`)
      }

      const imageId = await uploadImage({
        image,
        name: normalizedName,
        folder: "games",
        db,
      })

      const [game] = await db
        .insert(games)
        .values({ name, imageId, normalizedName, releaseYear })
        .returning()

      return send(game)
    },
  )
  .get(
    "/",
    zValidator("query", GetGamesQueryParamsSchema),
    async ({ req, var: { db, send } }) => {
      const { maps: withMaps } = req.valid("query")

      if (withMaps) {
        const allGames = await db.select().from(gamesWithMaps)

        return send(allGames.map(formatGame))
      }

      const gamesResult = await db.query.games.findMany({
        columns: {
          id: true,
          name: true,
          normalizedName: true,
        },
        with: {
          image: {
            columns: { url: true },
          },
        },
      })

      return send(gamesResult.map(formatGame))
    },
  )
  .get(
    "/:name",
    zValidator("param", CreateGameSchema.pick({ name: true })),
    async ({ req, var: { db, send, fail } }) => {
      const { name } = req.valid("param")

      const gamesResult = await db.query.games.findFirst({
        columns: {
          name: true,
        },
        where: eq(games.normalizedName, normalizeName(name)),
        with: {
          maps: {
            columns: { id: true, name: true, normalizedName: true },
            with: {
              image: { columns: { url: true } },
            },
          },
        },
      })

      if (!gamesResult) {
        return fail("NOT_FOUND", `Game with name '${name}' not found`)
      }

      return send(formatSingleGame(gamesResult))
    },
  )
