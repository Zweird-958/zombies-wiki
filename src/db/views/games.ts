import { eq, sql } from "drizzle-orm"
import { pgView } from "drizzle-orm/pg-core"

import { games, images, maps } from "@/db/schemas"
import type { UnformattedMap } from "@/types/maps"

export const gamesWithMaps = pgView("games_with_maps").as((qb) =>
  qb
    .select({
      id: games.id,
      name: games.name,
      slug: games.slug,
      image: {
        url: images.url,
      },
      maps: sql<UnformattedMap[]>`
          json_agg(
            json_build_object(
              'id', ${maps.id},
              'name', ${maps.name},
              'slug', ${maps.slug}
            )
          )
        `.as("maps"),
    })
    .from(games)
    .innerJoin(maps, eq(maps.gameId, games.id))
    .innerJoin(images, eq(images.id, games.imageId))
    .groupBy(games.id, games.name, images.url),
)
