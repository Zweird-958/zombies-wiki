import type z from "zod"

import type { CreateImageSchema, image } from "@/schemas/images"

export type Image = z.infer<typeof image>

export type CreateImage = z.infer<typeof CreateImageSchema>
