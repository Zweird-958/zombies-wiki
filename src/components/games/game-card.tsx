import type { ComponentProps } from "react"

import ItemCard from "@/components/items/item-card"
import { routes } from "@/utils/routes"

type Props = {
  slug: string
} & Omit<ComponentProps<typeof ItemCard>, "href">

const GameCard = ({ slug, ...props }: Props) => (
  <ItemCard href={routes.game(slug)} {...props} />
)

export default GameCard
