import { eq } from "drizzle-orm"

import type { DB } from "@/db"
import { maps } from "@/db/schemas"

export const deleteMap = async (db: DB, { slug }: { slug: string }) => {
  const [deletedMap] = await db
    .update(maps)
    .set({ deletedAt: new Date() })
    .where(eq(maps.slug, slug))
    .returning()

  return deletedMap
}
