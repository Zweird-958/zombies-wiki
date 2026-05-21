import { createAccessControl } from "better-auth/plugins/access"

const statement = {
  games: ["create"],
  guides: ["create", "update", "delete"],
  maps: ["create", "delete"],
  images: ["list"],
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
  games: ["create"],
  guides: ["create", "update", "delete"],
  maps: ["create", "delete"],
  images: ["list"],
})

export const user = ac.newRole({
  games: [],
})
