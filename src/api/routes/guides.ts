import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { isAuthorized } from "@/api/handlers/is-authorized"
import { formatGuide } from "@/api/utils/guides/format-guide"
import {
  CreateGuideFormDataSchema,
  EditGuideFormDataSchema,
} from "@/schemas/api"
import { GetGuideSchema } from "@/schemas/guides"
import { createGuide } from "@/utils/guides/create-guide"
import { deleteGuide } from "@/utils/guides/delete-guide"
import { editGuide } from "@/utils/guides/edit-guide"
import { getGuide } from "@/utils/guides/get-guide"

export const guidesApp = new Hono()
  .basePath("/guides")
  .post(
    "/",
    zValidator("form", CreateGuideFormDataSchema),
    ...isAuthorized({ guides: ["create"] }),
    async ({ req, var: { send, db } }) => {
      const guide = req.valid("form")

      const result = await createGuide(db, guide)

      return send(result)
    },
  )
  .get(
    "/:id",
    zValidator("param", GetGuideSchema),
    async ({ var: { db, send, fail }, req }) => {
      const { id } = req.valid("param")

      const guide = await getGuide(db, { id })

      if (!guide) {
        return fail("NOT_FOUND")
      }

      return send(formatGuide(guide))
    },
  )
  .patch(
    "/:id",
    zValidator("param", GetGuideSchema),
    zValidator("form", EditGuideFormDataSchema),
    ...isAuthorized({ guides: ["update"] }),
    async ({ req, var: { db, send, fail } }) => {
      const { id } = req.valid("param")
      const data = req.valid("form")

      const guide = await getGuide(db, { id })

      if (!guide) {
        return fail("NOT_FOUND")
      }

      const result = await editGuide(db, guide, data)

      return send(result)
    },
  )
  .delete(
    "/:id",
    zValidator("param", GetGuideSchema),
    ...isAuthorized({ guides: ["delete"] }),
    async ({ var: { db, send, fail }, req }) => {
      const { id } = req.valid("param")

      const guide = await getGuide(db, { id })

      if (!guide) {
        return fail("NOT_FOUND")
      }

      const deletedGuide = await deleteGuide(db, guide)

      return send(deletedGuide)
    },
  )
