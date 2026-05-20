import { faker } from "@faker-js/faker"

import { db } from "@/db"
import { guides } from "@/db/schemas"

import { generateImage } from "./generate-image"
import { generateMap } from "./generate-map"

export const generateGuide = async ({
  mapId,
  imageId,
}: {
  mapId?: string
  imageId?: string
} = {}) => {
  const [guide] = await db
    .insert(guides)
    .values({
      name: faker.word.words({ count: { min: 1, max: 5 } }),
      imageId: imageId ?? (await generateImage()).id,
      mapId: mapId ?? (await generateMap()).id,
    })
    .returning()

  return guide
}
