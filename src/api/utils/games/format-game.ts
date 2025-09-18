import { config } from "@/configs/api"

type Game = {
  id: string
  name: string
  normalizedName: string
  image: string
}

export const formatGame = (game: Game) => ({
  id: game.id,
  name: game.name,
  normalizedName: game.normalizedName,
  image: `${config.upload.publicUrl}${game.image}`,
})
