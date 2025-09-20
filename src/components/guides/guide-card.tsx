import type { ComponentProps } from "react"

import ItemCard from "@/components/items/item-card"
import { routes } from "@/utils/routes"

type Props = {
  game: string
  map: string
  id: string
} & Omit<ComponentProps<typeof ItemCard>, "href">

const GuideCard = ({ game, map, id, ...props }: Props) => (
  <ItemCard href={routes.guide(game, map, id)} {...props} />
)

export default GuideCard
