import { zValidator } from "@hono/zod-validator"
import { eq, sql } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGame } from "@/api/utils/games/format-game"
import { isGameExists } from "@/api/utils/games/is-game-exists"
import { normalizeName } from "@/api/utils/normalize-name"
import { uploadImage } from "@/api/utils/upload-image"
import { images, maps } from "@/db/schemas"
import { games } from "@/db/schemas/games"
import { CreateGameSchema } from "@/schemas/games"
import type { UnformattedMap } from "@/types/maps"

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
  .get("/", async ({ var: { db, send } }) => {
    const allGames = await db
      .select({
        id: games.id,
        name: games.name,
        normalizedName: games.normalizedName,
        image: {
          url: images.url,
        },
        maps: sql`
          json_agg(
            json_build_object(
              'id', ${maps.id},
              'name', ${maps.name},
              'normalizedName', ${maps.normalizedName}
            )
          )
        `.as("maps"),
      })
      .from(games)
      .innerJoin(maps, eq(maps.gameId, games.id))
      .innerJoin(images, eq(images.id, games.imageId))
      .groupBy(games.id, games.name, images.url)

    const typedGames = allGames as unknown as (Omit<
      (typeof allGames)[number],
      "maps"
    > & {
      maps: UnformattedMap[]
    })[]

    return send(typedGames.map(formatGame))
  })
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
          guides: {
            columns: { id: true, name: true },
          },
        },
      })

      if (!gamesResult) {
        return fail("NOT_FOUND", `Game with name '${name}' not found`)
      }

      return send(gamesResult)
    },
  )
