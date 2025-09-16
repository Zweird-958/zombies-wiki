import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import isGameExists from "@/api/utils/games/is-game-exists"
import normalizeGameName from "@/api/utils/games/normalize-game-name"
import uploadImage from "@/api/utils/upload-image"
import { games } from "@/db/schemas/games"
import { CreateGameSchema } from "@/schemas/games"

const gamesApp = new Hono()
  .basePath("/games")
  .post(
    "/",
    zValidator("form", CreateGameSchema),
    async ({ req, var: { send, db, fail } }) => {
      const { name, image } = req.valid("form")

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
        .values({ name, imageId, normalizedName })
        .returning()

      return send(game)
    },
  )

export default gamesApp
