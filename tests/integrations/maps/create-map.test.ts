import { faker } from "@faker-js/faker"
import { createFile } from "@tests/utils/create-file"
import { generateGame } from "@tests/utils/generate-game"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { createMap } from "@/utils/maps/create-map"

describe("createMap", () => {
  it("should create a map", async () => {
    const data = {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      image: await createFile(),
      gameId: (await generateGame()).id,
    }

    const createdMap = await createMap(db, data)

    expect(createdMap).toBeDefined()
    expect(createdMap.name).toBe(data.name)
    expect(createdMap.slug).toBe(slugify(data.name))
    expect(createdMap.gameId).toBe(data.gameId)

    const map = await db.query.maps.findFirst({
      where: (maps, { eq }) => eq(maps.id, createdMap.id),
    })

    expect(map).toBeDefined()
    expect(map?.name).toBe(data.name)
    expect(map?.slug).toBe(slugify(data.name))
    expect(map?.gameId).toBe(data.gameId)
  })
})
