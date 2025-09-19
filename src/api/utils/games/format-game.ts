import { config } from "@/configs/api"

type Game = {
  id: string
  name: string
  normalizedName: string
  image: {
    url: string
  }
  maps: { id: string; name: string }[]
}

export const formatGame = (game: Game) => ({
  id: game.id,
  name: game.name,
  normalizedName: game.normalizedName,
  image: `${config.upload.publicUrl}${game.image.url}`,
  maps: game.maps,
})
