import type z from "zod"

import type { CreateGuideSchema } from "@/schemas/guides"

export type CreateGuide = z.infer<typeof CreateGuideSchema>
