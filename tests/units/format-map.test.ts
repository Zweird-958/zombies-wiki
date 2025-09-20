import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatSingleMap } from "@/api/utils/maps/format-map"
import { normalizeName } from "@/api/utils/normalize-name"
import { config } from "@/configs/api"

const name = faker.lorem.words(3)
const normalizedName = normalizeName(name)

const map = {
  name,
  guides: [
    {
      id: faker.string.uuid(),
      name: faker.lorem.words(2),
      image: { url: normalizedName },
    },
  ],
  game: { name: faker.lorem.words(2) },
}

describe("formatSingleMap", () => {
  it("should format map data correctly", () => {
    const formattedMap = formatSingleMap(map)

    expect(formattedMap).toEqual({
      name: map.name,
      guides: map.guides.map((guide) => ({
        id: guide.id,
        name: guide.name,
        image: `${config.upload.publicUrl}${guide.image.url}`,
      })),
      game: map.game.name,
    })
  })
})
