import { config } from "@/configs/api"
import type {
  CreateStep,
  StepContent,
  StepMark,
  StepParagraph,
} from "@/types/steps"

type Option = "insert" | "select"

const normalizeMarks = ({
  marks,
  option,
}: {
  marks: StepMark[]
  option: Option
}) =>
  marks.map((mark) => {
    if (mark.type === "image" && mark.attrs.imageUrl) {
      return {
        ...mark,
        attrs: {
          ...mark.attrs,
          imageUrl:
            option === "insert"
              ? mark.attrs.imageUrl.replace(config.upload.publicUrl, "")
              : `${config.upload.publicUrl}${mark.attrs.imageUrl}`,
        },
      }
    }

    return mark
  })

const normalizeContent = ({
  content,
  option,
}: {
  content: StepContent[]
  option: Option
}) =>
  content.map(({ marks, ...rest }) => ({
    ...rest,
    ...(marks && { marks: normalizeMarks({ marks, option }) }),
  }))

export const normalizeParagraphs = ({
  paragraphs,
  option,
}: {
  paragraphs: StepParagraph[]
  option: Option
}) =>
  paragraphs.map(({ content, ...paragraph }) => ({
    ...paragraph,
    ...(content && { content: normalizeContent({ content, option }) }),
  }))

export const normalizeStep = ({
  step,
  option,
}: {
  step: CreateStep
  option: Option
}) => ({
  ...step,
  content: normalizeParagraphs({ paragraphs: step.content, option }),
})
