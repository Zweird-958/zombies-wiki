import { relations } from "drizzle-orm"
import { pgTable, text, uuid } from "drizzle-orm/pg-core"

import { images } from "@/db/schemas/images"
import { maps } from "@/db/schemas/maps"
import { steps } from "@/db/schemas/steps"
import { commonColumns } from "@/db/utils"

export const guides = pgTable("guides", {
  ...commonColumns,
  name: text("name").notNull(),
  imageId: uuid("image_id")
    .references(() => images.id)
    .notNull(),
  mapId: uuid("map_id")
    .references(() => maps.id)
    .notNull(),
})

export const guidesRelations = relations(guides, ({ one, many }) => ({
  map: one(maps, {
    fields: [guides.mapId],
    references: [maps.id],
  }),
  steps: many(steps),
  image: one(images, { fields: [guides.imageId], references: [images.id] }),
}))
