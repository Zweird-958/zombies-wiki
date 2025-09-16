import { eq } from "drizzle-orm"

import type { DB } from "@/db"
import { games } from "@/db/schemas"

const isGameExists = async (name: string, db: DB) => {
  const existingGames = await db
    .select({})
    .from(games)
    .where(eq(games.normalizedName, name))
    .limit(1)

  return existingGames.length > 0
}

export default isGameExists
