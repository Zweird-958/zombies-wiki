import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import type { DB } from "@/db"
import { games } from "@/db/schemas/games"
import type { CreateGame } from "@/types/games"

export const createGame = async (
  db: DB,
  { name, image, releaseYear }: CreateGame,
) => {
  const slug = slugify(name)

  const imageId = await uploadImage({
    image,
    name: slug,
    folder: "games",
    db,
  })

  const [game] = await db
    .insert(games)
    .values({ name, imageId, slug, releaseYear })
    .returning()

  return game
}
