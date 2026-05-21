import { faker } from "@faker-js/faker"
import { generateGuide } from "@tests/utils/generate-guide"
import { eq } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { guides } from "@/db/schemas"
import { getGuide } from "@/utils/guides/get-guide"

describe("getGuide", () => {
  it("should return a guide by ID", async () => {
    const guide = await generateGuide()

    const result = await getGuide(db, { id: guide.id })

    const steps = await db.query.steps.findMany({
      where: (step) => eq(step.guideId, guide.id),
    })

    const image = await db.query.images.findFirst({
      where: (img) => eq(img.id, guide.imageId),
    })

    expect(result).toBeDefined()
    expect(result?.name).toBe(guide.name)
    expect(result?.mapId).toBe(guide.mapId)
    expect(result?.steps).toStrictEqual(steps)
    expect(result?.imageId).toBe(guide.imageId)
    expect(result?.image.url).toBe(image?.url)
  })

  it("should return undefined if the guide does not exist", async () => {
    const result = await getGuide(db, { id: faker.string.uuid() })

    expect(result).toBeUndefined()
  })

  it("should throw an error if the guide ID is invalid", async () => {
    await expect(getGuide(db, { id: "invalid-id" })).rejects.toThrow()
  })

  it("should return undefined if the guide is deleted", async () => {
    const guide = await generateGuide()

    await db
      .update(guides)
      .set({ deletedAt: new Date() })
      .where(eq(guides.id, guide.id))

    const result = await getGuide(db, { id: guide.id })

    expect(result).toBeUndefined()
  })
})
