import type z from "zod"

import type { formatGuide } from "@/api/utils/guides/format-guide"
import type { EditGuideFormDataSchema } from "@/schemas/api"
import type { CreateGuideSchema, EditGuideSchema } from "@/schemas/guides"
import type { getGuide } from "@/utils/guides/get-guide"

export type CreateGuide = z.infer<typeof CreateGuideSchema>

export type Guide = NonNullable<Awaited<ReturnType<typeof getGuide>>>
export type FormattedGuide = ReturnType<typeof formatGuide>

export type EditGuide = z.infer<typeof EditGuideSchema>

export type EditGuideFormData = z.infer<typeof EditGuideFormDataSchema>
