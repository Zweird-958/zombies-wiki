import { faker } from "@faker-js/faker"
import { beforeAll, describe, expect, it } from "vitest"

import { isMapExists } from "@/api/utils/maps/is-map-exists"
import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { games, images, maps } from "@/db/schemas"

const name = faker.word.words({ count: { min: 1, max: 5 } })

const gameData: Omit<typeof games.$inferInsert, "imageId"> = {
  name,
  slug: slugify(name),
  releaseYear: faker.number.int({ min: 1970, max: 2050 }),
}

const mapData: Omit<typeof maps.$inferInsert, "imageId" | "gameId"> = {
  name: faker.word.words({ count: { min: 1, max: 5 } }),
  slug: "",
}

let gameId = ""

beforeAll(async () => {
  const [image] = await db
    .insert(images)
    .values({ url: faker.image.url() })
    .returning()

  const [game] = await db
    .insert(games)
    .values({ ...gameData, imageId: image.id })
    .returning({ id: games.id })

  gameId = game.id

  await db
    .insert(maps)
    .values({ ...mapData, imageId: image.id, gameId: game.id })
})

describe("isMapExists", () => {
  it("should return true if the map exists", async () => {
    const isExists = await isMapExists({ slug: mapData.slug, gameId }, db)

    expect(isExists).toBe(true)
  })

  it("should return false if the map exists but for another game", async () => {
    const isExists = await isMapExists(
      { slug: mapData.slug, gameId: faker.string.uuid() },
      db,
    )

    expect(isExists).toBe(false)
  })

  it("should return false if the map does not exist", async () => {
    const isExists = await isMapExists(
      { slug: faker.word.words({ count: { min: 6, max: 7 } }), gameId },
      db,
    )

    expect(isExists).toBe(false)
  })
})
