import { faker } from "@faker-js/faker"
import { createFile } from "@tests/utils/create-file"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { createGame } from "@/utils/games/create-game"

describe("createGame", () => {
  it("should create a game", async () => {
    const data = {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      image: await createFile(),
      releaseYear: faker.date.past({ years: 20 }).getFullYear(),
    }

    const createdGame = await createGame(db, data)

    expect(createdGame).toBeDefined()
    expect(createdGame.name).toBe(data.name)
    expect(createdGame.slug).toBe(slugify(data.name))
    expect(createdGame.releaseYear).toBe(data.releaseYear)

    const game = await db.query.games.findFirst({
      where: (games, { eq }) => eq(games.id, createdGame.id),
    })

    expect(game).toBeDefined()
    expect(game?.name).toBe(data.name)
    expect(game?.slug).toBe(slugify(data.name))
    expect(game?.releaseYear).toBe(data.releaseYear)
  })
})
