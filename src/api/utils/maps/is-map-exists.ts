import { and, eq } from "drizzle-orm"

import type { DB } from "@/db"
import { maps } from "@/db/schemas/maps"

export const isMapExists = async (
  { name, gameId }: { name: string; gameId: string },
  db: DB,
) => {
  const existingsMaps = await db
    .select({})
    .from(maps)
    .where(and(eq(maps.normalizedName, name), eq(maps.gameId, gameId)))
    .limit(1)

  return existingsMaps.length > 0
}
