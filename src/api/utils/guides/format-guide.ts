import { normalizeParagraphs } from "@/api/utils/steps/normalize-step"
import { config } from "@/configs/api"
import type { Guide } from "@/types/guides"

export const formatGuide = (guide: Guide) => ({
  id: guide.id,
  name: guide.name,
  mapId: guide.mapId,
  image: `${config.upload.publicUrl}${guide.image.url}`,
  steps: guide.steps.map(({ content, ...step }) => ({
    ...step,
    content: normalizeParagraphs({ paragraphs: content, option: "select" }),
  })),
})
