import { notFound } from "next/navigation"

import { client } from "@/api/client"
import ItemsLayout from "@/components/items/items-layout"
import MapCard from "@/components/maps/map-card"

type Props = {
  params: Promise<{ game: string }>
}

const GamePage = async ({ params }: Props) => {
  const { game } = await params
  const response = await client.games[":slug"].$get({ param: { slug: game } })
  const data = await response.json()

  if ("error" in data) {
    notFound()
  }

  return (
    <ItemsLayout name={data.result.name}>
      {data.result.maps.map((map) => (
        <MapCard key={map.id} game={game} {...map} />
      ))}
    </ItemsLayout>
  )
}

export default GamePage
