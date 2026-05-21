import { zValidator } from "@hono/zod-validator"
import { eq, isNull } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatSingleMap } from "@/api/utils/maps/format-map"
import { isMapExists } from "@/api/utils/maps/is-map-exists"
import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import { guides } from "@/db/schemas"
import { maps } from "@/db/schemas/maps"
import { SlugParamSchema } from "@/schemas/common"
import { CreateMapSchema } from "@/schemas/maps"

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

      const imageId = await uploadImage({
        image,
        name: slug,
        folder: `maps/${gameId}`,
        db,
      })

      const [map] = await db
        .insert(maps)
        .values({ name, imageId, slug, gameId })
        .returning()

      return send(map)
    },
  )
  .get(
    "/:slug",
    zValidator("param", SlugParamSchema),
    async ({ req, var: { send, db, fail } }) => {
      const { slug } = req.valid("param")

      const map = await db.query.maps.findFirst({
        columns: {
          name: true,
        },
        where: eq(maps.slug, slug),
        with: {
          guides: {
            where: isNull(guides.deletedAt),
            columns: { id: true, name: true },
            with: {
              image: {
                columns: { url: true },
              },
            },
          },
          game: { columns: { name: true } },
        },
      })

      if (!map) {
        return fail("NOT_FOUND", `Map with slug '${slug}' not found`)
      }

      return send(formatSingleMap(map))
    },
  )
