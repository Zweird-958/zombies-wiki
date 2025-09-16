import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

import * as schema from "./schemas"

const db = drizzle(
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST!
    : process.env.DATABASE_URL!,
  { schema },
)

export type DB = typeof db

export default db
