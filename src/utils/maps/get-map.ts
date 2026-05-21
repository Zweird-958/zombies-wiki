import { eq, isNull } from "drizzle-orm"

import type { DB } from "@/db"
import { guides, maps } from "@/db/schemas"

export const getMap = (db: DB, { slug }: { slug: string }) =>
  db.query.maps.findFirst({
    columns: {
      name: true,
    },
    where: eq(maps.slug, slug),
    with: {
      guides: {
        where: isNull(guides.deletedAt),
        columns: { id: true, name: true },
        with: {
          image: {
            columns: { url: true },
          },
        },
      },
      game: { columns: { name: true } },
    },
  })
