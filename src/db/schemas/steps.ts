import { relations } from "drizzle-orm"
import { integer, json, pgTable, text, uuid } from "drizzle-orm/pg-core"

import { guides } from "@/db/schemas/guides"
import { commonColumns } from "@/db/utils"
import type { StepParagraph } from "@/types/steps"

export const steps = pgTable("steps", {
  ...commonColumns,
  name: text("name").notNull(),
  order: integer("order").notNull(),
  content: json("content").$type<StepParagraph[]>().notNull(),
  guideId: uuid("guide_id")
    .references(() => guides.id)
    .notNull(),
})

export const stepsRelations = relations(steps, ({ one }) => ({
  guide: one(guides, {
    fields: [steps.guideId],
    references: [guides.id],
  }),
}))
