import { config } from "@/configs/api"
import type { Map } from "@/types/maps"

export const formatSingleMap = (map: Map) => ({
  name: map.name,
  guides: map.guides.map(({ image, ...guide }) => ({
    ...guide,
    image: `${config.upload.publicUrl}${image.url}`,
  })),
  game: map.game.name,
  image: `${config.upload.publicUrl}${map.image.url}`,
  gameId: map.gameId,
  slug: map.slug,
})
