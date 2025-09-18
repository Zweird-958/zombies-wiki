import z from "zod"

export const name = z
  .string()
  .trim()
  .min(1, "required")
  .transform((text) => text.replace(/\s+/gu, " "))
