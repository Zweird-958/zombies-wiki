import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatGame } from "@/api/utils/games/format-game"
import { slugify } from "@/api/utils/slugify"
import { config } from "@/configs/api"

const name = faker.lorem.words(3)
const slug = slugify(name)

const game = {
  id: faker.string.uuid(),
  name,
  slug,
  image: { url: slug },
  maps: [{ id: faker.string.uuid(), name: faker.lorem.words(2), slug }],
}

describe("formatGame", () => {
  it("should format game data correctly", () => {
    const formattedGame = formatGame(game)

    expect(formattedGame).toEqual({
      id: game.id,
      name: game.name,
      slug: game.slug,
      image: `${config.upload.publicUrl}${game.image.url}`,
      maps: game.maps,
    })
  })
})
