import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { normalizeStep } from "@/api/utils/steps/normalize-step"

import { generateStepContent } from "../utils/generate-step-content"

describe("normalizeStep", () => {
  it("should transforme absolute image url path to relative path", () => {
    const content = generateStepContent()
    const name = faker.lorem.words(3)

    const formattedStep = normalizeStep({
      step: { name, content },
      option: "insert",
    })

    expect(formattedStep).toEqual({
      name,
      content: generateStepContent(false),
    })
  })

  it("should transforme relative image url path to absolute path", () => {
    const content = generateStepContent(false)
    const name = faker.lorem.words(3)

    const formattedStep = normalizeStep({
      step: { name, content },
      option: "select",
    })

    expect(formattedStep).toEqual({
      name,
      content: generateStepContent(),
    })
  })
})
