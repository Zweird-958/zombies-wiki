import type { DB } from "@/db"
import { gamesWithMaps } from "@/db/views"

export const listGamesWithMaps = (db: DB) => db.select().from(gamesWithMaps)
