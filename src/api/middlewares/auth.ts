import type { User } from "better-auth"
import { createMiddleware } from "hono/factory"

import { auth as authConfig } from "@/utils/auth/auth"

type Env = {
  Variables: {
    user: User
  }
}

const auth = createMiddleware<Env>(
  async ({ set, req, var: { fail } }, next) => {
    const session = await authConfig.api.getSession({
      headers: req.raw.headers,
    })

    if (!session) {
      return fail("UNAUTHORIZED")
    }

    set("user", session.user)

    return next()
  },
)

export default auth
