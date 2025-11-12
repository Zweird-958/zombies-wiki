import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGame, formatSingleGame } from "@/api/utils/games/format-game"
import { isGameExists } from "@/api/utils/games/is-game-exists"
import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import { games } from "@/db/schemas/games"
import { gamesWithMaps } from "@/db/views"
import { SlugParamSchema } from "@/schemas/common"
import { CreateGameSchema, GetGamesQueryParamsSchema } from "@/schemas/games"

export const gamesApp = new Hono()
  .basePath("/games")
  .post(
    "/",
    zValidator("form", CreateGameSchema),
    ...isAuthorized({ games: ["create"] }),
    async ({ req, var: { send, db, fail } }) => {
      const { name, image, releaseYear } = req.valid("form")

      const slug = slugify(name)

      if (await isGameExists(slug, db)) {
        return fail("CONFLICT", `${name} already exists`)
      }

      const imageId = await uploadImage({
        image,
        name: slug,
        folder: "games",
        db,
      })

      const [game] = await db
        .insert(games)
        .values({ name, imageId, slug, releaseYear })
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
          slug: true,
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
    "/:slug",
    zValidator("param", SlugParamSchema),
    async ({ req, var: { db, send, fail } }) => {
      const { slug } = req.valid("param")

      const gamesResult = await db.query.games.findFirst({
        columns: {
          name: true,
        },
        where: eq(games.slug, slug),
        with: {
          maps: {
            columns: { id: true, name: true, slug: true },
            with: {
              image: { columns: { url: true } },
            },
          },
        },
      })

      if (!gamesResult) {
        return fail("NOT_FOUND", `Game with slug '${slug}' not found`)
      }

      return send(formatSingleGame(gamesResult))
    },
  )
