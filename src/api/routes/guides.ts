import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { guides, steps as stepsTable } from "@/db/schemas"
import { CreateGuideSchema, GetGuideSchema } from "@/schemas/guides"

export const guidesApp = new Hono()
  .basePath("/guides")
  .post(
    "/",
    zValidator("json", CreateGuideSchema),
    ...isAuthorized({ guides: ["create"] }),
    async ({ req, var: { send, db } }) => {
      const { name, mapId, steps } = req.valid("json")

      const result = await db.transaction(async (tx) => {
        const [guide] = await tx
          .insert(guides)
          .values({ name, mapId })
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
  .get(
    "/:id",
    zValidator("param", GetGuideSchema),
    async ({ var: { db, send, fail }, req }) => {
      const { id } = req.valid("param")

      const guide = await db.query.guides.findFirst({
        columns: {
          name: true,
        },
        where: eq(guides.id, id),
        with: {
          steps: {
            columns: {
              id: true,
              name: true,
              content: true,
            },
            orderBy: stepsTable.order,
          },
        },
      })

      if (!guide) {
        return fail("NOT_FOUND")
      }

      return send(guide)
    },
  )
