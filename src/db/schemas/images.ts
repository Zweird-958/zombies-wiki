import { pgTable, text } from "drizzle-orm/pg-core"

import { commonColumns } from "@/db/utils"

export const images = pgTable("images", {
  ...commonColumns,
  url: text("url").notNull().unique(),
})
