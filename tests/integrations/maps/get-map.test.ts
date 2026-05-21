import { faker } from "@faker-js/faker"
import { generateGuide } from "@tests/utils/generate-guide"
import { generateMap } from "@tests/utils/generate-map"
import { eq } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { guides, maps } from "@/db/schemas"
import { getMap } from "@/utils/maps/get-map"

describe("getMap", () => {
  it("should return a map by ID", async () => {
    const map = await generateMap()

    const result = await getMap(db, { slug: map.slug })

    const game = await db.query.games.findFirst({
      where: ({ id }) => eq(id, map.gameId),
    })

    const guidesResult = await db.query.guides.findMany({
      where: ({ mapId }) => eq(mapId, map.id),
      columns: {
        id: true,
        name: true,
      },
      with: {
        image: {
          columns: {
            url: true,
          },
        },
      },
    })

    expect(result).toBeDefined()
    expect(result?.name).toBe(map.name)
    expect(result?.game.name).toBe(game?.name)
    expect(result?.guides).toStrictEqual(guidesResult)
  })

  it("should return undefined if the map does not exist", async () => {
    const result = await getMap(db, { slug: slugify(faker.word.noun()) })

    expect(result).toBeUndefined()
  })

  it("should return undefined if the map is deleted", async () => {
    const map = await generateMap()

    await db
      .update(maps)
      .set({ deletedAt: new Date() })
      .where(eq(maps.id, map.id))

    const result = await getMap(db, { slug: map.slug })

    expect(result).toBeUndefined()
  })

  it("should return only guides that are not deleted", async () => {
    const map = await generateMap()

    const guide1 = await generateGuide({ mapId: map.id })

    const guide2 = await generateGuide({ mapId: map.id })

    await db
      .update(guides)
      .set({ deletedAt: new Date() })
      .where(eq(guides.id, guide1.id))

    const result = await getMap(db, { slug: map.slug })

    expect(result).toBeDefined()

    const guideImage = await db.query.images.findFirst({
      where: ({ id }) => eq(id, guide2.imageId),
    })

    expect(result?.guides).toStrictEqual([
      {
        id: guide2.id,
        name: guide2.name,
        image: { url: guideImage?.url ?? "" },
      },
    ])
  })
})
