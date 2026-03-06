import { createAccessControl } from "better-auth/plugins/access"

const statement = {
  games: ["create"],
  guides: ["create"],
  maps: ["create"],
  images: ["list", "create"],
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
  games: ["create"],
  guides: ["create"],
  maps: ["create"],
  images: ["list", "create"],
})

export const user = ac.newRole({
  games: [],
})
