import { faker } from "@faker-js/faker"
import { beforeAll, describe, expect, it } from "vitest"

import { isGameExists } from "@/api/utils/games/is-game-exists"
import { normalizeGameName } from "@/api/utils/games/normalize-game-name"
import { db } from "@/db"
import { games, images } from "@/db/schemas"

const name = faker.word.words({ count: { min: 1, max: 5 } })

const data: Omit<typeof games.$inferInsert, "imageId"> = {
  name,
  normalizedName: normalizeGameName(name),
  releaseYear: faker.number.int({ min: 1970, max: 2050 }),
}

beforeAll(async () => {
  const [image] = await db
    .insert(images)
    .values({ url: faker.image.url() })
    .returning()

  await db.insert(games).values({ ...data, imageId: image.id })
})

describe("isGameExists", () => {
  it("should return true if the game exists", async () => {
    const isExists = await isGameExists(data.normalizedName, db)

    expect(isExists).toBe(true)
  })

  it("should return false if the game does not exist", async () => {
    const isExists = await isGameExists(
      faker.word.words({ count: { min: 6, max: 7 } }),
      db,
    )

    expect(isExists).toBe(false)
  })
})
