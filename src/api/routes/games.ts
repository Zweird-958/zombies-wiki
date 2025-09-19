import { zValidator } from "@hono/zod-validator"
import { desc, eq } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGame } from "@/api/utils/games/format-game"
import { isGameExists } from "@/api/utils/games/is-game-exists"
import { normalizeGameName } from "@/api/utils/games/normalize-game-name"
import { uploadImage } from "@/api/utils/upload-image"
import { images } from "@/db/schemas"
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

      const normalizedName = normalizeGameName(name)

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
        image: images.url,
      })
      .from(games)
      .innerJoin(images, eq(games.imageId, images.id))
      .orderBy(desc(games.releaseYear))

    return send(allGames.map(formatGame))
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
        where: eq(games.normalizedName, normalizeGameName(name)),
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
