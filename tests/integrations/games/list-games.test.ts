import { faker } from "@faker-js/faker"
import { generateGame } from "@tests/utils/generate-game"
import { eq, inArray } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { games as gamesTable } from "@/db/schemas"
import { listGames } from "@/utils/games/list-games"

describe("listGames", () => {
  it("should return a list of games", async () => {
    await Promise.all(
      faker.helpers.multiple(() => generateGame(), {
        count: faker.number.int({ min: 2, max: 5 }),
      }),
    )

    const result = (await listGames(db)).sort((a, b) =>
      a.id.localeCompare(b.id),
    )

    const games = (
      await db.query.games.findMany({
        where: ({ deletedAt }, { isNull }) => isNull(deletedAt),
        columns: {
          id: true,
          name: true,
          slug: true,
        },
        with: {
          image: {
            columns: { url: true },
          },
        },
      })
    ).sort((a, b) => a.id.localeCompare(b.id))

    expect(result).toBeDefined()
    expect(result.some((r) => games.some((g) => g.id === r.id))).toBe(true)
  })

  it("should return only games that are not deleted", async () => {
    const game = await generateGame()

    await db
      .update(gamesTable)
      .set({ deletedAt: new Date() })
      .where(eq(gamesTable.id, game.id))

    const result = await listGames(db)

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
})
