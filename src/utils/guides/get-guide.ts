import { and, eq, isNull } from "drizzle-orm"

import type { DB } from "@/db"
import { steps } from "@/db/schemas"
import { guides } from "@/db/schemas/guides"

export const getGuide = (db: DB, { id }: { id: string }) =>
  db.query.guides.findFirst({
    columns: {
      id: true,
      name: true,
      mapId: true,
      imageId: true,
    },
    where: and(eq(guides.id, id), isNull(guides.deletedAt)),
    with: {
      steps: {
        columns: {
          id: true,
          name: true,
          content: true,
        },
        orderBy: steps.order,
      },
      image: {
        columns: {
          url: true,
        },
      },
    },
  })
