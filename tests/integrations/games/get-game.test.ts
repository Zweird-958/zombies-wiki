import { faker } from "@faker-js/faker"
import { generateGame } from "@tests/utils/generate-game"
import { generateMap } from "@tests/utils/generate-map"
import { eq } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { games, maps } from "@/db/schemas"
import { getGame } from "@/utils/games/get-game"

describe("getGame", () => {
  it("should return a game by slug", async () => {
    const game = await generateGame()

    const result = await getGame(db, { slug: game.slug })

    const mapsResult = await db.query.maps.findMany({
      where: ({ gameId }) => eq(gameId, game.id),
      columns: {
        id: true,
        name: true,
        slug: true,
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
    expect(result?.name).toBe(game.name)
    expect(result?.maps).toStrictEqual(mapsResult)
  })

  it("should return undefined if the game does not exist", async () => {
    const result = await getGame(db, { slug: slugify(faker.word.noun()) })

    expect(result).toBeUndefined()
  })

  it("should return undefined if the game is deleted", async () => {
    const game = await generateGame()

    await db
      .update(games)
      .set({ deletedAt: new Date() })
      .where(eq(games.id, game.id))

    const result = await getGame(db, { slug: game.slug })

    expect(result).toBeUndefined()
  })

  it("should return only maps that are not deleted", async () => {
    const game = await generateGame()

    const map1 = await generateMap({ gameId: game.id })

    const map2 = await generateMap({ gameId: game.id })

    await db
      .update(maps)
      .set({ deletedAt: new Date() })
      .where(eq(maps.id, map1.id))

    const result = await getGame(db, { slug: game.slug })

    expect(result).toBeDefined()

    const mapImage = await db.query.images.findFirst({
      where: ({ id }) => eq(id, map2.imageId),
    })

    expect(result?.maps).toStrictEqual([
      {
        id: map2.id,
        name: map2.name,
        slug: map2.slug,
        image: { url: mapImage?.url ?? "" },
      },
    ])
  })
})
