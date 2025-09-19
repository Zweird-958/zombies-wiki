import type z from "zod"

import type { CreateMapSchema } from "@/schemas/maps"

export type CreateMap = z.infer<typeof CreateMapSchema>
