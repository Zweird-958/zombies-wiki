import { config } from "@/configs/api"
import type { StepParagraph } from "@/types/steps"

export const generateStepContent = (isAbsolutePath = true): StepParagraph[] => [
  {
    type: "paragraph",
    content: [
      { type: "text", text: "test" },
      {
        type: "text",
        text: "test",
        marks: [
          {
            type: "image",
            attrs: {
              imageUrl: isAbsolutePath
                ? `${config.upload.publicUrl}games/call-of-duty-black-ops-2`
                : "games/call-of-duty-black-ops-2",
            },
          },
        ],
      },
    ],
  },
]
