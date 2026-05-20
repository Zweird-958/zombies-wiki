import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import type { DB } from "@/db"
import { guides, steps as stepsTable } from "@/db/schemas"
import type { CreateGuide } from "@/types/guides"

export const createGuide = async (
  db: DB,
  { name, steps, image, mapId }: CreateGuide,
) =>
  await db.transaction(async (tx) => {
    const imageId = await uploadImage({
      image,
      name: slugify(name),
      folder: `guides/${mapId}`,
      db,
    })

    const [guide] = await tx
      .insert(guides)
      .values({ name, mapId, imageId })
      .returning()

    const stepsResult = await tx
      .insert(stepsTable)
      .values(
        steps.map((step, index) => ({
          guideId: guide.id,
          order: index + 1,
          ...step,
        })),
      )
      .returning()

    return { ...guide, steps: stepsResult }
  })
