import { faker } from "@faker-js/faker"
import { createFile } from "@tests/utils/create-file"
import { generateMap } from "@tests/utils/generate-map"
import { generateStep } from "@tests/utils/generate-step"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { createGuide } from "@/utils/guides/create-guide"

describe("createGuide", () => {
  it("should create a guide", async () => {
    const map = await generateMap()

    const data = {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      image: await createFile(),
      steps: [generateStep(false)],
      mapId: map.id,
    }

    const createdGuide = await createGuide(db, data)

    expect(createdGuide).toBeDefined()
    expect(createdGuide.name).toBe(data.name)
    expect(createdGuide.mapId).toBe(data.mapId)
    expect(createdGuide.steps).toHaveLength(data.steps.length)

    const result = await db.query.guides.findFirst({
      columns: {
        name: true,
        mapId: true,
      },
      where: (guide, { eq }) => eq(guide.id, createdGuide.id),
      with: {
        steps: true,
      },
    })

    expect(result).toBeDefined()
    expect(result?.name).toBe(data.name)
    expect(result?.mapId).toBe(data.mapId)
    expect(result?.steps).toHaveLength(data.steps.length)
  })
})
