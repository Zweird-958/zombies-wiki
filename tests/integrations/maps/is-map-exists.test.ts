import { faker } from "@faker-js/faker"
import { generateGame } from "@tests/utils/generate-game"
import { generateMap } from "@tests/utils/generate-map"
import { beforeAll, describe, expect, it } from "vitest"

import { isMapExists } from "@/api/utils/maps/is-map-exists"
import { db } from "@/db"

let gameId = ""
let mapSlug = ""

beforeAll(async () => {
  const game = await generateGame()

  gameId = game.id

  const map = await generateMap({ gameId })

  mapSlug = map.slug
})

describe("isMapExists", () => {
  it("should return true if the map exists", async () => {
    const isExists = await isMapExists({ slug: mapSlug, gameId }, db)

    expect(isExists).toBe(true)
  })

  it("should return false if the map exists but for another game", async () => {
    const isExists = await isMapExists(
      { slug: mapSlug, gameId: faker.string.uuid() },
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
