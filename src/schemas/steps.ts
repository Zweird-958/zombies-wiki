import z from "zod"

import { name } from "@/schemas/common"

export const CreateStepSchema = z.object({
  name,
  content: z
    .string()
    .min(1, "required")
    .refine((val) => val.trim() !== "<p></p>", {
      message: "required",
    }),
})
