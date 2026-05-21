import { notFound } from "next/navigation"

import { client } from "@/api/client"
import GamePage from "@/components/games/game-page"

type Props = {
  params: Promise<{ game: string }>
}

const Page = async ({ params }: Props) => {
  const { game } = await params
  const response = await client.games[":slug"].$get({ param: { slug: game } })
  const data = await response.json()

  if ("error" in data) {
    notFound()
  }

  return <GamePage game={data.result} />
}

export default Page
