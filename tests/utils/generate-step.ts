import { faker } from "@faker-js/faker"

import { db } from "@/db"
import { steps } from "@/db/schemas"

import { generateGuide } from "./generate-guide"
import { generateStepContent } from "./generate-step-content"

export const generateStep = (isAbsolutePath = true) => ({
  name: faker.lorem.words(3),
  content: generateStepContent(isAbsolutePath),
})

export const generateStepDb = async ({ guideId }: { guideId?: string }) => {
  const [step] = await db
    .insert(steps)
    .values({
      ...generateStep(false),
      guideId: guideId ?? (await generateGuide()).id,
      order: faker.number.int({ min: 0, max: 10 }),
    })
    .returning()

  return step
}
