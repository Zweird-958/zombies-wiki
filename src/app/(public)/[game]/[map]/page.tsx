import { notFound } from "next/navigation"

import { client } from "@/api/client"
import MapPage from "@/components/maps/map-page"

type Props = {
  params: Promise<{ game: string; map: string }>
}

const Page = async ({ params }: Props) => {
  const { map: mapName } = await params
  const data = await (
    await client.maps[":slug"].$get({ param: { slug: mapName } })
  ).json()

  if ("error" in data) {
    notFound()
  }

  return <MapPage map={data.result} />
}

export default Page
