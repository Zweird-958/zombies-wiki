import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

import * as schema from "./schemas"

export const db = drizzle(
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST!
    : process.env.DATABASE_URL!,
  { schema },
)

export type DB = typeof db
