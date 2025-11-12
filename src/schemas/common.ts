import z from "zod"

export const name = z
  .string()
  .trim()
  .min(1, "required")
  .transform((text) => text.replace(/\s+/gu, " "))

export const id = z.uuid("required")

export const SlugParamSchema = z.object({
  slug: z.string().trim().min(1, "required"),
})
