import Link from "next/link"
import { notFound } from "next/navigation"

import { client } from "@/api/client"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { routes } from "@/utils/routes"

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
        {data.result.guides.map(({ id, name }) => (
          <Card key={id} className="w-fit" asChild>
            <Link href={routes.guide(game, id)}>
              <CardHeader>
                <CardTitle>{name}</CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default GamePage
