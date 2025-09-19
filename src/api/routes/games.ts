import { zValidator } from "@hono/zod-validator"
import { desc, eq } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGame } from "@/api/utils/games/format-game"
import { isGameExists } from "@/api/utils/games/is-game-exists"
import { normalizeName } from "@/api/utils/normalize-name"
import { uploadImage } from "@/api/utils/upload-image"
import { games } from "@/db/schemas/games"
import { CreateGameSchema } from "@/schemas/games"

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
    const allGames = await db.query.games.findMany({
      columns: {
        id: true,
        name: true,
        normalizedName: true,
        imageId: true,
      },
      with: {
        image: {
          columns: {
            url: true,
          },
        },
        maps: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [desc(games.releaseYear)],
    })

    return send(allGames.filter((game) => game.maps.length > 0).map(formatGame))
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
