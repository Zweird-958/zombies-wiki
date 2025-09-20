import type { ComponentProps } from "react"

import ItemCard from "@/components/ui/item-card"
import { routes } from "@/utils/routes"

type Props = {
  normalizedName: string
} & Omit<ComponentProps<typeof ItemCard>, "href">

const GameCard = ({ normalizedName, ...props }: Props) => (
  <ItemCard href={routes.game(normalizedName)} {...props} />
)

export default GameCard
