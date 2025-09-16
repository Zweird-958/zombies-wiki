/* eslint-disable no-console */
import { reset as drizzleReset } from "drizzle-seed"

import { db } from "@/db"
import * as schema from "@/db/schemas"

const reset = async () => {
  console.log("Resetting database...")

  await drizzleReset(db, schema)

  await db.$client.end()
}

void reset()
