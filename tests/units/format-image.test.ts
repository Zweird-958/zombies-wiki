import { faker } from "@faker-js/faker"
import { describe, expect, it } from "vitest"

import { formatImage } from "@/api/utils/images/format-image"
import { config } from "@/configs/api"

describe("formatImage", () => {
  it("should format image data correctly", () => {
    const image = {
      id: faker.string.uuid(),
      url: faker.word.words(1),
    }

    const formattedImage = formatImage(image)

    expect(formattedImage).toEqual({
      id: image.id,
      url: `${config.upload.publicUrl}${image.url}`,
    })
  })
})
