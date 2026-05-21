import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatSingleMap } from "@/api/utils/maps/format-map"
import { isMapExists } from "@/api/utils/maps/is-map-exists"
import { slugify } from "@/api/utils/slugify"
import { SlugParamSchema } from "@/schemas/common"
import { CreateMapSchema } from "@/schemas/maps"
import { createMap } from "@/utils/maps/create-map"
import { deleteMap } from "@/utils/maps/delete-map"
import { getMap } from "@/utils/maps/get-map"

export const mapsApp = new Hono()
  .basePath("/maps")
  .post(
    "/",
    zValidator("form", CreateMapSchema),
    ...isAuthorized({ maps: ["create"] }),
    async ({ req, var: { send, db, fail } }) => {
      const { name, image, gameId } = req.valid("form")
      const slug = slugify(name)

      if (await isMapExists({ slug, gameId }, db)) {
        return fail("CONFLICT", `${name} already exists`)
      }

      const map = await createMap(db, { name, image, gameId })

      return send(map)
    },
  )
  .get(
    "/:slug",
    zValidator("param", SlugParamSchema),
    async ({ req, var: { send, db, fail } }) => {
      const { slug } = req.valid("param")

      const map = await getMap(db, { slug })

      if (!map) {
        return fail("NOT_FOUND", `Map with slug '${slug}' not found`)
      }

      return send(formatSingleMap(map))
    },
  )
  .delete(
    "/:slug",
    zValidator("param", SlugParamSchema),
    ...isAuthorized({ maps: ["delete"] }),
    async ({ req, var: { send, db, fail } }) => {
      const { slug } = req.valid("param")

      const map = await getMap(db, { slug })

      if (!map) {
        return fail("NOT_FOUND", `Map with slug '${slug}' not found`)
      }

      const deletedMap = await deleteMap(db, { slug })

      return send(deletedMap)
    },
  )
