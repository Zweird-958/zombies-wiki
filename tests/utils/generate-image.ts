import { faker } from "@faker-js/faker"

import { db } from "@/db"
import { images } from "@/db/schemas"

export const generateImage = async () => {
  const [image] = await db
    .insert(images)
    .values({ url: faker.image.url() })
    .returning()

  return image
}
