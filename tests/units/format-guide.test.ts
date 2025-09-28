import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatGuide } from "@/api/utils/guides/format-guide"

import { generateStepContent } from "../utils/generate-step-content"

describe("formatImage", () => {
  it("should format image data correctly", () => {
    const guide = {
      name: faker.lorem.words(3),
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
      steps: guide.steps.map((step) => ({
        id: step.id,
        name: step.name,
        content: generateStepContent(),
      })),
    })
  })
})
