import { eq } from "drizzle-orm"

import type { DB } from "@/db"
import { games } from "@/db/schemas"

export const deleteGame = async (db: DB, { slug }: { slug: string }) => {
  const [deletedGame] = await db
    .update(games)
    .set({ deletedAt: new Date() })
    .where(eq(games.slug, slug))
    .returning()

  return deletedGame
}
