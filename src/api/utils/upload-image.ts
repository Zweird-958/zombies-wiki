import { PutObjectCommand } from "@aws-sdk/client-s3"

import s3 from "@/api/utils/s3"
import config from "@/configs/api"
import type { DB } from "@/db"
import { images } from "@/db/schemas"
import type { Image } from "@/types/images"

const uploadImage = async ({
  image,
  name,
  folder,
  db,
}: {
  image: Image
  name: string
  folder: string
  db: DB
}) => {
  const url = `${folder}/${name}`

  const command = new PutObjectCommand({
    Bucket: config.upload.bucket,
    Key: url,
    ContentType: image.type,
    Body: Buffer.from(await image.arrayBuffer()),
  })

  await s3.send(command)

  const [{ id }] = await db
    .insert(images)
    .values({ url })
    .returning({ id: images.id })

  return id
}

export default uploadImage
