import type { JSX } from "react"

import ImageDialog from "@/components/steps/image-dialog"
import type { StepContent, StepParagraph } from "@/types/steps"

type Options = {
  stepId: string
  paragraphIndex: number
  contentIndex: number
}

const getContent = (
  { text, marks }: Omit<StepContent, "type">,
  { contentIndex, paragraphIndex, stepId }: Options,
) => {
  if (!marks || marks.length === 0) {
    return text
  }

  const commonKey = `${stepId}-${paragraphIndex}-${contentIndex}`

  let result: JSX.Element = <>{text}</>

  for (const mark of marks) {
    if (mark.type === "bold") {
      result = <strong key={`${commonKey}-bold`}>{result}</strong>

      continue
    }

    if (mark.type === "underline") {
      result = <u key={`${commonKey}-underline`}>{result}</u>
    }

    if (mark.type === "image") {
      result = (
        <ImageDialog key={`${commonKey}-image`} imageUrl={mark.attrs.imageUrl}>
          {result}
        </ImageDialog>
      )
    }
  }

  return result
}

export const renderStep = (paragraphs: StepParagraph[], stepId: string) =>
  paragraphs.map(({ content: paragraph }, index) => {
    if (!paragraph) {
      return <br key={`${stepId}-br-${index}`} />
    }

    return (
      <p key={`${stepId}-p-${index}`}>
        {paragraph.map((content, contentIndex) =>
          getContent(content, {
            stepId,
            paragraphIndex: index,
            contentIndex,
          }),
        )}
      </p>
    )
  })
