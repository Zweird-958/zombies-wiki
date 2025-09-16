import { pgTable, text } from "drizzle-orm/pg-core"

import { commonColumns } from "@/db/utils"

export const games = pgTable("games", {
  ...commonColumns,
  name: text("name").notNull().unique(),
})
