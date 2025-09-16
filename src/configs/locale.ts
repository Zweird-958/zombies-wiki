import z from "zod"

import { locale } from "@/schemas/locales"

const schema = z.object({
  defaultLocale: locale,
  locales: locale.array(),
  cookie: z.string(),
})

export const config = schema.parse({
  defaultLocale: "en",
  locales: locale.options,
  cookie: "locale",
})
