import type z from "zod"

import type { SignInSchema } from "@/schemas/users"

export type SignIn = z.infer<typeof SignInSchema>

export type Role = "admin" | "user"
