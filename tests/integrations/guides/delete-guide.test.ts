import { faker } from "@faker-js/faker"
import { generateGuide } from "@tests/utils/generate-guide"
import { eq } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { guides } from "@/db/schemas/guides"
import { deleteGuide } from "@/utils/guides/delete-guide"
import { getGuide } from "@/utils/guides/get-guide"

describe("deleteGuide", () => {
  it("should delete a guide by ID", async () => {
    const guide = await generateGuide()

    await deleteGuide(db, { id: guide.id })

    const deletedGuide = await db.query.guides.findFirst({
      where: eq(guides.id, guide.id),
      columns: {
        deletedAt: true,
      },
    })

    expect(deletedGuide?.deletedAt).not.toBeNull()
    await expect(getGuide(db, { id: guide.id })).resolves.toBeUndefined()
  })

  it("should return undefined if the guide does not exist", async () => {
    const guide = await deleteGuide(db, { id: faker.string.uuid() })

    expect(guide).toBeUndefined()
  })
})
