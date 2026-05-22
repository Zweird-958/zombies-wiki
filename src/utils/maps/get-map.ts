import { and, eq, isNull } from "drizzle-orm"

import type { DB } from "@/db"
import { guides, maps } from "@/db/schemas"

export const getMap = (db: DB, { slug }: { slug: string }) =>
  db.query.maps.findFirst({
    columns: {
      id: true,
      name: true,
      imageId: true,
      gameId: true,
      slug: true,
    },
    where: and(eq(maps.slug, slug), isNull(maps.deletedAt)),
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
      image: { columns: { url: true } },
    },
  })
