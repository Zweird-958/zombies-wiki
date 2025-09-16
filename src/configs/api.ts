import { z } from "zod"

const schema = z.object({
  upload: z.object({
    url: z.string(),
    bucket: z.string(),
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
    publicUrl: z.string().endsWith("/"),
  }),
})

const config = schema.parse({
  upload: {
    url: process.env.S3_URL,
    bucket: process.env.S3_BUCKET_NAME,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    publicUrl: process.env.S3_PUBLIC_URL,
  },
})

export default config
