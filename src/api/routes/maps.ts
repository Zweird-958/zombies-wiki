import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { isMapExists } from "@/api/utils/maps/is-map-exists"
import { normalizeName } from "@/api/utils/normalize-name"
import { uploadImage } from "@/api/utils/upload-image"
import { maps } from "@/db/schemas/maps"
import { CreateMapSchema } from "@/schemas/maps"

export const mapsApp = new Hono()
  .basePath("/maps")
  .post(
    "/",
    zValidator("form", CreateMapSchema),
    ...isAuthorized({ maps: ["create"] }),
    async ({ req, var: { send, db, fail } }) => {
      const { name, image, gameId } = req.valid("form")
      const normalizedName = normalizeName(name)

      if (await isMapExists({ name: normalizedName, gameId }, db)) {
        return fail("CONFLICT", `${name} already exists`)
      }

      const imageId = await uploadImage({
        image,
        name: normalizedName,
        folder: `maps/${gameId}`,
        db,
      })

      const [map] = await db
        .insert(maps)
        .values({ name, imageId, normalizedName, gameId })
        .returning()

      return send(map)
    },
  )
