import { faker } from "@faker-js/faker"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { games } from "@/db/schemas"

import { generateImage } from "./generate-image"

export const generateGame = async (imageId?: string) => {
  const name = faker.word.words({ count: { min: 1, max: 5 } })
  const data: Omit<typeof games.$inferInsert, "imageId"> = {
    name,
    slug: slugify(name),
    releaseYear: faker.number.int({ min: 1970, max: 2050 }),
  }

  if (!imageId) {
    const image = await generateImage()

    const [game] = await db
      .insert(games)
      .values({ ...data, imageId: image.id })
      .returning()

    return game
  }

  const [game] = await db
    .insert(games)
    .values({ ...data, imageId })
    .returning()

  return game
}
