import { faker } from "@faker-js/faker"
import { generateGame } from "@tests/utils/generate-game"
import { eq } from "drizzle-orm"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { games } from "@/db/schemas"
import { deleteGame } from "@/utils/games/delete-game"
import { getGame } from "@/utils/games/get-game"

describe("deleteGame", () => {
  it("should delete a game by slug", async () => {
    const game = await generateGame()

    await deleteGame(db, { slug: game.slug })

    const deletedGame = await db.query.games.findFirst({
      where: eq(games.id, game.id),
      columns: {
        deletedAt: true,
      },
    })

    expect(deletedGame?.deletedAt).not.toBeNull()
    await expect(getGame(db, { slug: game.slug })).resolves.toBeUndefined()
  })

  it("should return undefined if the game does not exist", async () => {
    const game = await deleteGame(db, { slug: faker.word.noun() })

    expect(game).toBeUndefined()
  })
})
