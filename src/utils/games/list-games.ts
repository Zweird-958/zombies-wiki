import type { DB } from "@/db"

export const listGames = (db: DB) =>
  db.query.games.findMany({
    where: ({ deletedAt }, { isNull }) => isNull(deletedAt),
    columns: {
      id: true,
      name: true,
      slug: true,
    },
    with: {
      image: {
        columns: { url: true },
      },
    },
  })
