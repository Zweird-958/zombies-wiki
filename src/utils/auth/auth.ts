import { type BetterAuthOptions, betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin as adminPlugin, customSession } from "better-auth/plugins"

import { db } from "@/db"
import * as schema from "@/db/schemas/auth-schema"
import type { Role } from "@/types/users"
import { ac, admin, user } from "@/utils/auth/permissions"

const config = {
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    adminPlugin({
      defaultRole: "user",
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
} satisfies BetterAuthOptions

export const auth = betterAuth({
  ...config,
  plugins: [
    ...config.plugins,
    customSession(
      // eslint-disable-next-line require-await, @typescript-eslint/require-await
      async ({ user: userSession, session }) => ({
        user: userSession as typeof userSession & { role: Role },
        session,
      }),
      config,
    ),
  ],
})
