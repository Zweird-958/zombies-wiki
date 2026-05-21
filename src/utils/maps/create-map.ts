import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import type { DB } from "@/db"
import { maps } from "@/db/schemas/maps"
import type { CreateMap } from "@/types/maps"

export const createMap = async (db: DB, { name, image, gameId }: CreateMap) => {
  const slug = slugify(name)

  const imageId = await uploadImage({
    image,
    name: slug,
    folder: `maps/${gameId}`,
    db,
  })

  const [map] = await db
    .insert(maps)
    .values({ name, imageId, slug, gameId })
    .returning()

  return map
}
