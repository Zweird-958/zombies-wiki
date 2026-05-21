import { faker } from "@faker-js/faker"

import { slugify } from "@/api/utils/slugify"
import { db } from "@/db"
import { maps } from "@/db/schemas"

import { generateGame } from "../utils/generate-game"
import { generateImage } from "./generate-image"

export const generateMap = async ({
  gameId,
  imageId,
}: {
  gameId?: string
  imageId?: string
} = {}): Promise<typeof maps.$inferSelect> => {
  const name = faker.word.words({ count: { min: 1, max: 20 } })

  if (
    await db.query.maps.findFirst({ where: (m, { eq }) => eq(m.name, name) })
  ) {
    return generateMap({ imageId, gameId })
  }

  const data = {
    name,
    slug: slugify(name),
  }

  if (!gameId) {
    const game = await generateGame()

    const [map] = await db
      .insert(maps)
      .values({
        ...data,
        imageId: game.imageId,
        gameId: game.id,
      })
      .returning()

    return map
  }

  const [map] = await db
    .insert(maps)
    .values({
      ...data,
      imageId: imageId ?? (await generateImage()).id,
      gameId,
    })
    .returning()

  return map
}
