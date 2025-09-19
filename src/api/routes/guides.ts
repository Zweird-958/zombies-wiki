import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { guides, steps as stepsTable } from "@/db/schemas"
import { CreateGuideSchema } from "@/schemas/guides"

export const guidesApp = new Hono()
  .basePath("/guides")
  .post(
    "/",
    zValidator("json", CreateGuideSchema),
    ...isAuthorized({ guides: ["create"] }),
    async ({ req, var: { send, db } }) => {
      const { name, gameId, steps } = req.valid("json")

      const result = await db.transaction(async (tx) => {
        const [guide] = await tx
          .insert(guides)
          .values({ name, gameId })
          .returning()

        const stepsResult = await tx
          .insert(stepsTable)
          .values(
            steps.map((step, index) => ({
              guideId: guide.id,
              order: index + 1,
              ...step,
            })),
          )
          .returning()

        return { ...guide, steps: stepsResult }
      })

      return send(result)
    },
  )
