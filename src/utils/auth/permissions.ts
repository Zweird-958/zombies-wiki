import { createAccessControl } from "better-auth/plugins/access"

const statement = {
  games: ["create"],
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
  games: ["create"],
})

export const user = ac.newRole({
  games: [],
})
