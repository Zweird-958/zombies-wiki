import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatImage } from "@/api/utils/images/format-image"
import { uploadImage } from "@/api/utils/upload-image"
import { CreateImageSchema } from "@/schemas/images"

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
  .post(
    "/",
    zValidator("form", CreateImageSchema),
    ...isAuthorized({ images: ["create"] }),
    async ({ req, var: { send, db } }) => {
      const { image } = req.valid("form")
      const imageName = `image-step-${Date.now()}`

      const imageId = await uploadImage({
        image,
        name: imageName,
        folder: "step",
        db,
      })

      return send({ id: imageId })
    },
  )
