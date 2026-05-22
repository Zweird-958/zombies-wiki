import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatSingleMap } from "@/api/utils/maps/format-map"
import { slugify } from "@/api/utils/slugify"
import { config } from "@/configs/api"
import type { Map } from "@/types/maps"

const name = faker.lorem.words(3)
const slug = slugify(name)

const map: Map = {
  name,
  guides: [
    {
      id: faker.string.uuid(),
      name: faker.lorem.words(2),
      image: { url: slug },
    },
  ],
  game: { name: faker.lorem.words(2) },
  gameId: faker.string.uuid(),
  id: faker.string.uuid(),
  image: { url: faker.image.url() },
  imageId: faker.string.uuid(),
  slug,
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
      gameId: map.gameId,
      image: `${config.upload.publicUrl}${map.image.url}`,
      slug: map.slug,
    })
  })
})
