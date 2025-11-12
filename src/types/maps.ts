import type z from "zod"

import type { CreateMapSchema } from "@/schemas/maps"

export type CreateMap = z.infer<typeof CreateMapSchema>

export type UnformattedMap = {
  id: string
  name: string
  slug: string
}
