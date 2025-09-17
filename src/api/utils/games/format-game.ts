import { config } from "@/configs/api"

type Game = {
  name: string
  normalizedName: string
  image: string
}

export const formatGame = (game: Game) => ({
  name: game.name,
  normalizedName: game.normalizedName,
  image: `${config.upload.publicUrl}${game.image}`,
})
