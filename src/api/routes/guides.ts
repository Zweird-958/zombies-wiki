import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { guides } from "@/db/schemas"
import { CreateGuideSchema } from "@/schemas/guides"

export const guidesApp = new Hono()
  .basePath("/guides")
  .post(
    "/",
    zValidator("json", CreateGuideSchema),
    ...isAuthorized({ guides: ["create"] }),
    async ({ req, var: { send, db } }) => {
      const { name, gameId } = req.valid("json")

      const [guide] = await db
        .insert(guides)
        .values({ name, gameId })
        .returning()

      return send(guide)
    },
  )
