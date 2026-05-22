import { faker } from "@faker-js/faker"
import { createFile } from "@tests/utils/create-file"
import { generateGame } from "@tests/utils/generate-game"
import { generateMap } from "@tests/utils/generate-map"
import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { editMap } from "@/utils/maps/edit-map"
import { getMap } from "@/utils/maps/get-map"

describe("editMap", () => {
  it("should edit a map", async () => {
    const map = await getMap(db, await generateMap())

    const data = {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      image: await createFile(),
      gameId: (await generateGame()).id,
    }

    await editMap(db, map!, data)

    const editedMap = await getMap(db, { slug: slugify(data.name) })

    expect(editedMap).toBeDefined()
    expect(editedMap?.name).toBe(data.name)
    expect(editedMap?.gameId).toBe(data.gameId)
  })
})
