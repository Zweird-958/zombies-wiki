import { createFactory } from "hono/factory"

import auth from "@/api/middlewares/auth"
import { auth as authConfig } from "@/utils/auth/auth"

type Permissions = NonNullable<
  Parameters<typeof authConfig.api.userHasPermission>[0]["body"]["permissions"]
>

const factory = createFactory()

const isAuthorized = (permissions: Permissions) =>
  factory.createHandlers(auth, async ({ var: { fail, user } }, next) => {
    const result = await authConfig.api.userHasPermission({
      body: {
        userId: user.id,
        permissions,
      },
    })

    if (!result.success) {
      return fail("FORBIDDEN")
    }

    return next()
  })

export default isAuthorized
