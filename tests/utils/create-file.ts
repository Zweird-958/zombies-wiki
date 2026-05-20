import { faker } from "@faker-js/faker"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const createFile = async () => {
  const imagePath = path.resolve(
    dirname,
    "../../public/images/call-of-duty-black-ops-6.png",
  )

  const buffer = (await fs.readFile(imagePath)) as BlobPart

  return new File([buffer], faker.system.fileName(), { type: "image/png" })
}
