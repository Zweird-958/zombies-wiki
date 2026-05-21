import { faker } from "@faker-js/faker"

import { db } from "@/db"
import { images } from "@/db/schemas"

export const generateImage = async (): Promise<typeof images.$inferSelect> => {
  const url = faker.image.url()

  if (
    await db.query.images.findFirst({ where: (i, { eq }) => eq(i.url, url) })
  ) {
    return generateImage()
  }

  const [image] = await db.insert(images).values({ url }).returning()

  return image
}
