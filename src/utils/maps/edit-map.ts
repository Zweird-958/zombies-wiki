import { eq } from "drizzle-orm"

import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import type { DB } from "@/db"
import { games, maps } from "@/db/schemas"
import type { EditMap, Map } from "@/types/maps"

export const editMap = async (
  db: DB,
  map: Map,
  { name, image, gameId }: EditMap,
) => {
  let imageId: string | null = null

  if (image) {
    imageId = await uploadImage({
      image,
      name: slugify(name ?? map.name),
      folder: "maps",
      db,
    })
  }

  const [editedMap] = await db
    .update(maps)
    .set({
      name: name ?? map.name,
      slug: slugify(name ?? map.name),
      imageId: imageId ?? map.imageId,
      gameId: gameId ?? map.gameId,
    })
    .where(eq(maps.id, map.id))
    .returning()

  const game = await db.query.games.findFirst({
    where: eq(games.id, editedMap.gameId),
    columns: {
      slug: true,
    },
  })

  return { ...editedMap, game: game?.slug ?? "" }
}
