import z from "zod"

import { name } from "@/schemas/common"

export const CreateGuideSchema = z.object({
  name,
  gameId: z.string().min(1, "required").uuid(),
})
