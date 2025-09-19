import type z from "zod"

import type { CreateStepSchema } from "@/schemas/steps"

export type CreateStep = z.infer<typeof CreateStepSchema>
