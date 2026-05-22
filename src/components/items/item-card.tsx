import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  name: string
  image: string
  href: string
}

const ItemCard = ({ name, image, href }: Props) => (
  <Card
    className="group h-64 w-full max-w-64 items-center justify-center p-0"
    render={(props) => (
      <Link href={href} {...props}>
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
    )}
  />
)

export default ItemCard
