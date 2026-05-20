import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { db } from "@/db"
import { EditGuideFormData } from "@/types/guides"
import { editGuide } from "@/utils/guides/edit-guide"
import { getGuide } from "@/utils/guides/get-guide"

import { createFile } from "../utils/create-file"
import { generateGuide } from "../utils/generate-guide"
import { generateMap } from "../utils/generate-map"
import { generateStep, generateStepDb } from "../utils/generate-step"

describe("editGuide", () => {
  it("should edit a guide", async () => {
    const guide = await getGuide(db, await generateGuide())

    const data: EditGuideFormData = {
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      image: await createFile(),
      steps: [generateStep(false)],
      mapId: (await generateMap()).id,
    }

    await editGuide(db, guide!, data)

    const editedGuide = await getGuide(db, { id: guide!.id })

    expect(editedGuide).toBeDefined()
    expect(editedGuide?.name).toBe(data.name)
    expect(editedGuide?.mapId).toBe(data.mapId)
    expect(editedGuide?.steps).toHaveLength(data.steps.length)
  })

  it("should add new steps to a guide", async () => {
    const guide = await getGuide(db, await generateGuide())
    const { name, content, id } = await generateStepDb({ guideId: guide!.id })

    await editGuide(db, guide!, {
      steps: [{ name, content, stepId: id }, generateStep(false)],
    })

    const editedGuide = await getGuide(db, { id: guide!.id })

    const steps = await db.query.steps.findMany({
      columns: {
        id: true,
        name: true,
        content: true,
      },
      where: (step, { eq }) => eq(step.guideId, guide!.id),
      orderBy: (step, { asc }) => asc(step.order),
    })

    expect(editedGuide).toBeDefined()
    expect(editedGuide?.steps).toStrictEqual(steps)
  })
})
