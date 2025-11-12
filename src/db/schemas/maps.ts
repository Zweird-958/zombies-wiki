import { relations } from "drizzle-orm"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"

import { games } from "@/db/schemas/games"
import { guides } from "@/db/schemas/guides"
import { images } from "@/db/schemas/images"
import { commonColumns } from "@/db/utils"

export const maps = pgTable("maps", {
  ...commonColumns,
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  imageId: uuid("image_id")
    .references(() => images.id)
    .notNull(),
  gameId: uuid("game_id")
    .references(() => games.id)
    .notNull(),
})

export const mapsRelations = relations(maps, ({ one, many }) => ({
  game: one(games, {
    fields: [maps.gameId],
    references: [games.id],
  }),
  guides: many(guides),
  image: one(images, { fields: [maps.imageId], references: [images.id] }),
}))
