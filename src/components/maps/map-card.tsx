import type { ComponentProps } from "react"

import ItemCard from "@/components/items/item-card"
import { routes } from "@/utils/routes"

type Props = {
  normalizedName: string
  game: string
} & Omit<ComponentProps<typeof ItemCard>, "href">

const MapCard = ({ game, normalizedName, ...props }: Props) => (
  <ItemCard href={routes.map(game, normalizedName)} {...props} />
)

export default MapCard
