import { adminClient, customSessionClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

import type { auth } from "@/utils/auth/auth"
import { ac, admin, user } from "@/utils/auth/permissions"

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
    customSessionClient<typeof auth>(),
  ],
})
