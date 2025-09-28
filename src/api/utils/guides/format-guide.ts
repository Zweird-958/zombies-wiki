import { normalizeParagraphs } from "@/api/utils/steps/normalize-step"
import type { StepParagraph } from "@/types/steps"

type Guide = {
  name: string
  steps: {
    name: string
    id: string
    content: StepParagraph[]
  }[]
}

export const formatGuide = (guide: Guide) => ({
  name: guide.name,
  steps: guide.steps.map(({ content, ...step }) => ({
    ...step,
    content: normalizeParagraphs({ paragraphs: content, option: "select" }),
  })),
})
