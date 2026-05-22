import { faker } from "@faker-js/faker"
import { generateGame } from "@tests/utils/generate-game"
import { generateMap } from "@tests/utils/generate-map"
import { eq, inArray } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { games as gamesTable, maps as mapsTable } from "@/db/schemas"
import { listGamesWithMaps } from "@/utils/games/list-games-with-maps"

describe("listGamesWithMaps", () => {
  it("should return a list of games with their maps", async () => {
    const generatedGames = await Promise.all(
      faker.helpers.multiple(() => generateGame(), {
        count: faker.number.int({ min: 2, max: 5 }),
      }),
    )

    await Promise.all(
      generatedGames.map(({ id }) => generateMap({ gameId: id })),
    )

    const result = (await listGamesWithMaps(db)).sort((a, b) =>
      a.id.localeCompare(b.id),
    )

    const games = (
      await db.query.games.findMany({
        where: ({ deletedAt, id }, { isNull, and }) =>
          and(
            isNull(deletedAt),
            inArray(
              id,
              result.map((r) => r.id),
            ),
          ),
        columns: {
          id: true,
          name: true,
          slug: true,
        },
        with: {
          image: {
            columns: { url: true },
          },
          maps: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
            where: ({ deletedAt }, { isNull }) => isNull(deletedAt),
          },
        },
      })
    )
      .filter((game) => game.maps.length > 0)
      .sort((a, b) => a.id.localeCompare(b.id))

    expect(result).toBeDefined()
    expect(result.some((r) => games.some((g) => g.id === r.id))).toBe(true)
  })

  it("should return only games that are not deleted", async () => {
    const game = await generateGame()

    await db
      .update(gamesTable)
      .set({ deletedAt: new Date() })
      .where(eq(gamesTable.id, game.id))

    const result = await listGamesWithMaps(db)

    const games = await db.query.games.findMany({
      where: ({ id }) =>
        inArray(
          id,
          result.map((g) => g.id),
        ),
      columns: {
        deletedAt: true,
      },
    })

    expect(result).toBeDefined()

    expect(games.every(({ deletedAt }) => deletedAt === null)).toBe(true)
  })

  it("should return only maps that are not deleted", async () => {
    const game = await generateGame()

    const map1 = await generateMap({ gameId: game.id })

    await generateMap({ gameId: game.id })

    await db
      .update(mapsTable)
      .set({ deletedAt: new Date() })
      .where(eq(mapsTable.id, map1.id))

    const result = await listGamesWithMaps(db)

    const maps = await db.query.maps.findMany({
      where: ({ id }) =>
        inArray(
          id,
          result.flatMap((g) => g.maps.map((m) => m.id)),
        ),
      columns: {
        deletedAt: true,
      },
    })

    expect(result).toBeDefined()
    expect(maps.every(({ deletedAt }) => deletedAt === null)).toBe(true)
  })
})
