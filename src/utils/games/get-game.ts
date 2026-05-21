import { and, eq, isNull } from "drizzle-orm"

import type { DB } from "@/db"
import { games } from "@/db/schemas"

export const getGame = (db: DB, { slug }: { slug: string }) =>
  db.query.games.findFirst({
    columns: {
      id: true,
      name: true,
      imageId: true,
      releaseYear: true,
      slug: true,
    },
    where: and(eq(games.slug, slug), isNull(games.deletedAt)),
    with: {
      maps: {
        columns: { id: true, name: true, slug: true },
        where: ({ deletedAt }) => isNull(deletedAt),
        with: {
          image: { columns: { url: true } },
        },
      },
      image: { columns: { url: true } },
    },
  })
