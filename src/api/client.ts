import { hc } from "hono/client"
import z from "zod"

import type { AppType } from "@/api/app"

const schema = z.object({
  appUrl: z.string().url(),
})

const config = schema.parse({
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? process.env.VERCEL_URL,
})

export const client = hc<AppType>(config.appUrl).api
