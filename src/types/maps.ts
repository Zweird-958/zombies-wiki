import type z from "zod"

import type { formatSingleMap } from "@/api/utils/maps/format-map"
import type { CreateMapSchema, EditMapSchema } from "@/schemas/maps"
import type { getMap } from "@/utils/maps/get-map"

export type CreateMap = z.infer<typeof CreateMapSchema>

export type UnformattedMap = {
  id: string
  name: string
  slug: string
}

export type Map = NonNullable<Awaited<ReturnType<typeof getMap>>>

export type EditMap = z.infer<typeof EditMapSchema>

export type FormattedMap = ReturnType<typeof formatSingleMap>
