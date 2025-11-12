import { relations } from "drizzle-orm"
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core"

import { images } from "@/db/schemas/images"
import { maps } from "@/db/schemas/maps"
import { commonColumns } from "@/db/utils"

export const games = pgTable("games", {
  ...commonColumns,
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  imageId: uuid("image_id")
    .references(() => images.id)
    .notNull(),
  releaseYear: integer("release_year").notNull(),
})

export const gameRelations = relations(games, ({ many, one }) => ({
  maps: many(maps),
  image: one(images, {
    fields: [games.imageId],
    references: [images.id],
  }),
}))
