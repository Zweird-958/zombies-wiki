import { and, eq } from "drizzle-orm"

import type { DB } from "@/db"
import { maps } from "@/db/schemas/maps"

export const isMapExists = async (
  { slug, gameId }: { slug: string; gameId: string },
  db: DB,
) => {
  const existingsMaps = await db
    .select({})
    .from(maps)
    .where(and(eq(maps.slug, slug), eq(maps.gameId, gameId)))
    .limit(1)

  return existingsMaps.length > 0
}
