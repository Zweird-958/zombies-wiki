import { eq } from "drizzle-orm"

import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import type { DB } from "@/db"
import { games } from "@/db/schemas"
import type { EditGame, Game } from "@/types/games"

export const editGame = async (
  db: DB,
  game: Game,
  { name, image, releaseYear }: EditGame,
) => {
  let imageId: string | null = null

  if (image) {
    imageId = await uploadImage({
      image,
      name: slugify(name ?? game.name),
      folder: "games",
      db,
    })
  }

  const [editedGame] = await db
    .update(games)
    .set({
      name: name ?? game.name,
      slug: slugify(name ?? game.name),
      imageId: imageId ?? game.imageId,
      releaseYear: releaseYear ?? game.releaseYear,
    })
    .where(eq(games.id, game.id))
    .returning()

  return editedGame
}
