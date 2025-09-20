import { createAccessControl } from "better-auth/plugins/access"

const statement = {
  games: ["create"],
  guides: ["create"],
  maps: ["create"],
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
  games: ["create"],
  guides: ["create"],
  maps: ["create"],
})

export const user = ac.newRole({
  games: [],
})
