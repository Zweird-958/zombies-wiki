import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { routes } from "@/utils/routes"

type Props = {
  id: string
  name: string
  image: string
  game: string
}

const MapCard = ({ name, image, game, id }: Props) => (
  <Card
    className="group h-64 w-full max-w-64 items-center justify-center p-0"
    asChild
  >
    <Link href={routes.guide(game, id)}>
      <CardHeader className="absolute z-10 text-lg">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="relative size-full overflow-hidden p-0 blur-xs">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </CardContent>
    </Link>
  </Card>
)

export default MapCard
