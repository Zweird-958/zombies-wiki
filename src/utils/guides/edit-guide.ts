import { eq } from "drizzle-orm"

import { slugify } from "@/api/utils/slugify"
import { uploadImage } from "@/api/utils/upload-image"
import type { DB } from "@/db"
import { guides, steps as stepsTable } from "@/db/schemas"
import type { EditGuideFormData, Guide } from "@/types/guides"
import type { CreateStep, EditStep } from "@/types/steps"

export const editGuide = async (
  db: DB,
  guide: Guide,
  { name, image, steps, mapId }: EditGuideFormData,
) => {
  let imageId: string | null = null

  if (image) {
    imageId = await uploadImage({
      image,
      name: slugify(name ?? guide.name),
      folder: `guides/${guide.mapId}`,
      db,
    })
  }

  const [editedGuide] = await db
    .update(guides)
    .set({
      name: name ?? guide.name,
      imageId: imageId ?? guide.imageId,
      mapId: mapId ?? guide.mapId,
    })
    .where(eq(guides.id, guide.id))
    .returning()

  const stepsWithOrder = steps.map((step, index) => ({
    ...step,
    order: index + 1,
  }))

  const stepsToEdit = steps.filter(
    (step) => step.stepId,
  ) as Required<EditStep>[]
  const stepsToCreate = stepsWithOrder.filter(
    (step) => !step.stepId,
  ) as (CreateStep & { order: number })[]

  const editedSteps =
    stepsToEdit.length > 0
      ? await Promise.all(
          stepsToEdit.map((step) =>
            db
              .update(stepsTable)
              .set({
                name: step.name,
                content: step.content,
              })
              .where(eq(stepsTable.id, step.stepId))
              .returning()
              .then(([edited]) => edited),
          ),
        )
      : []

  const createdSteps =
    stepsToCreate.length > 0
      ? await db
          .insert(stepsTable)
          .values(
            stepsToCreate.map((step) => ({
              guideId: guide.id,
              ...step,
            })),
          )
          .returning()
      : []

  return {
    guide: editedGuide,
    steps: [...editedSteps, ...createdSteps].sort((a, b) => a.order - b.order),
  }
}
