import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { getMap } from "@/utils/maps/get-map"

import { generateMap } from "../utils/generate-map"

describe("getMap", () => {
  it("should return a map by ID", async () => {
    const map = await generateMap()

    const result = await getMap(db, { slug: map.slug })

    const game = await db.query.games.findFirst({
      where: ({ id }, { eq }) => eq(id, map.gameId),
    })

    const guides = await db.query.guides.findMany({
      where: ({ mapId }, { eq }) => eq(mapId, map.id),
      columns: {
        id: true,
        name: true,
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
    expect(result?.name).toBe(map.name)
    expect(result?.game.name).toBe(game?.name)
    expect(result?.guides).toStrictEqual(guides)
  })

  it("should return undefined if the guide does not exist", async () => {
    const result = await getMap(db, { slug: slugify(faker.word.noun()) })

    expect(result).toBeUndefined()
  })
})
