import { relations } from "drizzle-orm"
import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core"

import { guides } from "@/db/schemas/guides"
import { images } from "@/db/schemas/images"
import { commonColumns } from "@/db/utils"

export const games = pgTable("games", {
  ...commonColumns,
  name: text("name").notNull().unique(),
  normalizedName: text("normalized_name").notNull().unique(),
  imageId: uuid("image_id")
    .references(() => images.id)
    .notNull(),
  releaseYear: integer("release_year").notNull(),
})

export const gameRelations = relations(games, ({ many }) => ({
  guides: many(guides),
}))
