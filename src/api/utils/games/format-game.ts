import { config } from "@/configs/api"
import type { Game } from "@/types/games"
import type { listGames } from "@/utils/games/list-games"
import type { listGamesWithMaps } from "@/utils/games/list-games-with-maps"

type GamesWithMaps = Awaited<ReturnType<typeof listGamesWithMaps>>
type Games = Awaited<ReturnType<typeof listGames>>

export const formatGame = (game: GamesWithMaps[number] | Games[number]) => ({
  id: game.id,
  name: game.name,
  slug: game.slug,
  image: `${config.upload.publicUrl}${game.image.url}`,
  maps: "maps" in game ? game.maps : [],
})

export const formatSingleGame = (game: Game) => ({
  name: game.name,
  slug: game.slug,
  image: `${config.upload.publicUrl}${game.image.url}`,
  releaseYear: game.releaseYear,
  maps: game.maps.map(({ image, ...map }) => ({
    ...map,
    image: `${config.upload.publicUrl}${image.url}`,
  })),
})
