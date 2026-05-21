import { faker } from "@faker-js/faker"
import { generateMap } from "@tests/utils/generate-map"
import { eq } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { maps } from "@/db/schemas"
import { deleteMap } from "@/utils/maps/delete-map"
import { getMap } from "@/utils/maps/get-map"

describe("deleteMap", () => {
  it("should delete a map by slug", async () => {
    const map = await generateMap()

    await deleteMap(db, { slug: map.slug })

    const deletedMap = await db.query.maps.findFirst({
      where: eq(maps.id, map.id),
      columns: {
        deletedAt: true,
      },
    })

    expect(deletedMap?.deletedAt).not.toBeNull()
    await expect(getMap(db, { slug: map.slug })).resolves.toBeUndefined()
  })

  it("should return undefined if the map does not exist", async () => {
    const map = await deleteMap(db, { slug: faker.word.noun() })

    expect(map).toBeUndefined()
  })
})
