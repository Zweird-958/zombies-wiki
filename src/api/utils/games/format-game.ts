import { config } from "@/configs/api"
import type { UnformattedMap } from "@/types/maps"

type Game = {
  id: string
  name: string
  normalizedName: string
  image: {
    url: string
  }
  maps?: UnformattedMap[]
}

export const formatGame = (game: Game) => ({
  id: game.id,
  name: game.name,
  normalizedName: game.normalizedName,
  image: `${config.upload.publicUrl}${game.image.url}`,
  maps: game.maps,
})

type SingleGame = Pick<Game, "name"> & {
  maps: { id: string; name: string; image: { url: string } }[]
}

export const formatSingleGame = (game: SingleGame) => ({
  name: game.name,
  maps: game.maps.map(({ image, ...map }) => ({
    ...map,
    image: `${config.upload.publicUrl}${image.url}`,
  })),
})
