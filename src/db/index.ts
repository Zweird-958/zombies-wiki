import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

import * as schemas from "./schemas"
import * as views from "./views"

export const db = drizzle(
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST!
    : process.env.DATABASE_URL!,
  { schema: { ...schemas, ...views } },
)

export type DB = typeof db
