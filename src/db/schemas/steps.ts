import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core"

import { guides } from "@/db/schemas/guides"
import { commonColumns } from "@/db/utils"

export const steps = pgTable("steps", {
  ...commonColumns,
  name: text("name").notNull(),
  order: integer("order").notNull(),
  content: text("content").notNull(),
  guideId: uuid("guide_id")
    .references(() => guides.id)
    .notNull(),
})
