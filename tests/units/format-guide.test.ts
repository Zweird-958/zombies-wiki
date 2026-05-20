import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatGuide } from "@/api/utils/guides/format-guide"
import { config } from "@/configs/api"

import { generateStepContent } from "../utils/generate-step-content"

describe("formatImage", () => {
  it("should format image data correctly", () => {
    const guide = {
      mapId: faker.string.uuid(),
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      imageId: faker.string.uuid(),
      image: {
        url: faker.image.url(),
      },
      steps: [
        {
          name: faker.lorem.words(3),
          id: faker.string.uuid(),
          content: generateStepContent(false),
        },
      ],
    }

    const formattedGuide = formatGuide(guide)

    expect(formattedGuide).toEqual({
      name: guide.name,
      mapId: guide.mapId,
      id: guide.id,
      image: `${config.upload.publicUrl}${guide.image.url}`,
      steps: guide.steps.map((step) => ({
        id: step.id,
        name: step.name,
        content: generateStepContent(),
      })),
    })
  })
})
