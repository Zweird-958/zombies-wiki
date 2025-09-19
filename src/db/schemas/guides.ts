import { relations } from "drizzle-orm"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"

import { games } from "@/db/schemas/games"
import { commonColumns } from "@/db/utils"

export const guides = pgTable("guides", {
  ...commonColumns,
  name: text("name").notNull(),
  gameId: uuid("game_id")
    .references(() => games.id)
    .notNull(),
})

export const guidesRelations = relations(guides, ({ one }) => ({
  game: one(games, {
    fields: [guides.gameId],
    references: [games.id],
  }),
}))
