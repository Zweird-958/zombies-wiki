import { notFound } from "next/navigation"

import { client } from "@/api/client"
import MapCard from "@/components/maps/map-card"

type Props = {
  params: Promise<{ game: string }>
}

const GamePage = async ({ params }: Props) => {
  const { game } = await params
  const response = await client.games[":name"].$get({ param: { name: game } })
  const data = await response.json()

  if ("error" in data) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <h1 className="pb-8 text-center text-xl font-semibold">
        {data.result.name}
      </h1>
      <div className="flex w-full flex-wrap justify-center gap-8">
        {data.result.maps.map((map) => (
          <MapCard key={map.id} game={game} {...map} />
        ))}
      </div>
    </div>
  )
}

export default GamePage
