import z from "zod"

export const CreateGameSchema = z.object({
  name: z.string().trim().min(1, "required"),
})
