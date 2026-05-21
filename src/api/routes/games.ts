import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGame, formatSingleGame } from "@/api/utils/games/format-game"
import { isGameExists } from "@/api/utils/games/is-game-exists"
import { slugify } from "@/api/utils/slugify"
import { SlugParamSchema } from "@/schemas/common"
import {
  CreateGameSchema,
  EditGameSchema,
  GetGamesQueryParamsSchema,
} from "@/schemas/games"
import { createGame } from "@/utils/games/create-game"
import { deleteGame } from "@/utils/games/delete-game"
import { editGame } from "@/utils/games/edit-game"
import { getGame } from "@/utils/games/get-game"
import { listGames } from "@/utils/games/list-games"
import { listGamesWithMaps } from "@/utils/games/list-games-with-maps"

export const gamesApp = new Hono()
  .basePath("/games")
  .post(
    "/",
    zValidator("form", CreateGameSchema),
    ...isAuthorized({ games: ["create"] }),
    async ({ req, var: { send, db, fail } }) => {
      const { name, ...values } = req.valid("form")

      const slug = slugify(name)

      if (await isGameExists(slug, db)) {
        return fail("CONFLICT", `${name} already exists`)
      }

      const game = await createGame(db, { name, ...values })

      return send(game)
    },
  )
  .get(
    "/",
    zValidator("query", GetGamesQueryParamsSchema),
    async ({ req, var: { db, send } }) => {
      const { maps: withMaps } = req.valid("query")

      if (withMaps) {
        const allGames = await listGamesWithMaps(db)

        return send(allGames.map(formatGame))
      }

      const gamesResult = await listGames(db)

      return send(gamesResult.map(formatGame))
    },
  )
  .get(
    "/:slug",
    zValidator("param", SlugParamSchema),
    async ({ req, var: { db, send, fail } }) => {
      const { slug } = req.valid("param")

      const gamesResult = await getGame(db, { slug })

      if (!gamesResult) {
        return fail("NOT_FOUND", `Game with slug '${slug}' not found`)
      }

      return send(formatSingleGame(gamesResult))
    },
  )
  .delete(
    "/:slug",
    zValidator("param", SlugParamSchema),
    ...isAuthorized({ games: ["delete"] }),
    async ({ req, var: { db, send, fail } }) => {
      const { slug } = req.valid("param")

      const game = await getGame(db, { slug })

      if (!game) {
        return fail("NOT_FOUND", `Game with slug '${slug}' not found`)
      }

      const deletedGame = await deleteGame(db, { slug })

      return send(deletedGame)
    },
  )
  .patch(
    "/:slug",
    zValidator("param", SlugParamSchema),
    zValidator("form", EditGameSchema),
    ...isAuthorized({ games: ["update"] }),
    async ({ req, var: { db, send, fail } }) => {
      const { slug } = req.valid("param")
      const data = req.valid("form")

      const game = await getGame(db, { slug })

      if (!game) {
        return fail("NOT_FOUND", `Game with slug '${slug}' not found`)
      }

      const result = await editGame(db, game, data)

      return send(result)
    },
  )
