import type { ComponentProps } from "react"

import ItemCard from "@/components/items/item-card"
import { routes } from "@/utils/routes"

type Props = {
  slug: string
  game: string
} & Omit<ComponentProps<typeof ItemCard>, "href">

const MapCard = ({ game, slug, ...props }: Props) => (
  <ItemCard href={routes.map(game, slug)} {...props} />
)

export default MapCard
