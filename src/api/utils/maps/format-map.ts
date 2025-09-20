import { config } from "@/configs/api"

type Map = {
  name: string
  guides: {
    id: string
    name: string
    image: {
      url: string
    }
  }[]
  game: {
    name: string
  }
}

export const formatSingleMap = (map: Map) => ({
  name: map.name,
  guides: map.guides.map(({ image, ...guide }) => ({
    ...guide,
    image: `${config.upload.publicUrl}${image.url}`,
  })),
  game: map.game.name,
})
