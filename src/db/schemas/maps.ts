import { pgTable, text, uuid } from "drizzle-orm/pg-core"

import { games } from "@/db/schemas/games"
import { images } from "@/db/schemas/images"
import { commonColumns } from "@/db/utils"

export const maps = pgTable("maps", {
  ...commonColumns,
  name: text("name").notNull(),
  normalizedName: text("normalized_name").notNull(),
  imageId: uuid("image_id")
    .references(() => images.id)
    .notNull(),
  gameId: uuid("game_id")
    .references(() => games.id)
    .notNull(),
})
