import { headers } from "next/headers"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { auth } from "@/utils/auth/auth"

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    notFound()
  }

  return children
}

export default AuthLayout
