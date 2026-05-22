import { createAccessControl } from "better-auth/plugins/access"

const statement = {
  games: ["create", "update", "delete"],
  guides: ["create", "update", "delete"],
  maps: ["create", "update", "delete"],
  images: ["list"],
} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({
  games: ["create", "update", "delete"],
  guides: ["create", "update", "delete"],
  maps: ["create", "update", "delete"],
  images: ["list"],
})

export const user = ac.newRole({
  games: [],
})
