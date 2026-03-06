import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatImage } from "@/api/utils/images/format-image"

export const imagesApp = new Hono()
  .basePath("/images")
  .get(
    "/",
    ...isAuthorized({ images: ["list"] }),
    async ({ var: { send, db } }) => {
      const images = await db.query.images.findMany()

      return send(images.map(formatImage))
    },
  )
