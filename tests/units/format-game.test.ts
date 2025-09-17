import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatGame } from "@/api/utils/games/format-game"
import { normalizeGameName } from "@/api/utils/games/normalize-game-name"
import { config } from "@/configs/api"

const name = faker.lorem.words(3)
const normalizedName = normalizeGameName(name)

const game = {
  name,
  normalizedName,
  image: normalizedName,
}

describe("formatGame", () => {
  it("should format game data correctly", () => {
    const formattedGame = formatGame(game)

    expect(formattedGame).toEqual({
      name: game.name,
      normalizedName: game.normalizedName,
      image: `${config.upload.publicUrl}${game.image}`,
    })
  })
})
