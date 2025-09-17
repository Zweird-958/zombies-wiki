import z from "zod"

export const SignInSchema = z.object({
  email: z.email("invalid"),
  password: z.string().min(1, "required"),
})
