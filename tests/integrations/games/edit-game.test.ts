import { faker } from "@faker-js/faker"
import { createFile } from "@tests/utils/create-file"
import { generateGame } from "@tests/utils/generate-game"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { editGame } from "@/utils/games/edit-game"
import { getGame } from "@/utils/games/get-game"

describe("editGame", () => {
  it("should edit a game", async () => {
    const game = await getGame(db, await generateGame())

    const data = {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      image: await createFile(),
      releaseYear: faker.date.past().getFullYear(),
    }

    await editGame(db, game!, data)

    const editedGame = await getGame(db, { slug: slugify(data.name) })

    expect(editedGame).toBeDefined()
    expect(editedGame?.name).toBe(data.name)
    expect(editedGame?.releaseYear).toBe(data.releaseYear)
  })
})
