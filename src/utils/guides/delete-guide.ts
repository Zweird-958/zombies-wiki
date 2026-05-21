import { eq } from "drizzle-orm"

import type { DB } from "@/db"
import { guides } from "@/db/schemas/guides"

export const deleteGuide = async (db: DB, { id }: { id: string }) => {
  const [deletedGuide] = await db
    .update(guides)
    .set({ deletedAt: new Date() })
    .where(eq(guides.id, id))
    .returning()

  return deletedGuide
}
