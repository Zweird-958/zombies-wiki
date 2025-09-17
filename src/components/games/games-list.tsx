import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Game } from "@/types/games"
import { routes } from "@/utils/routes"

type Props = {
  games: Game[]
}

const GamesList = ({ games }: Props) => (
  <div className="flex w-full flex-wrap justify-center gap-8">
    {games.map(({ normalizedName, name, image }) => (
      <Card
        asChild
        key={normalizedName}
        className="w-full max-w-[300px] overflow-hidden p-0 transition-shadow duration-300"
      >
        <Link href={routes.game(normalizedName)}>
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={image}
                alt={normalizedName}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </CardContent>
          <CardFooter className="pb-3">
            <h3 className="text-foregroundmb-1 font-semibold">{name}</h3>
          </CardFooter>
        </Link>
      </Card>
    ))}
  </div>
)

export default GamesList
