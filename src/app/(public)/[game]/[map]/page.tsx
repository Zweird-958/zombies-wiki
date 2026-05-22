import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { client } from "@/api/client"
import GuideCard from "@/components/guides/guide-card"
import ItemsLayout from "@/components/items/items-layout"
import DeleteMap from "@/components/maps/delete-map"
import MapPage from "@/components/maps/map-page"

type Props = {
  params: Promise<{ game: string; map: string }>
}

const Page = async ({ params }: Props) => {
  const { map: mapName, game } = await params
  const t = await getTranslations("maps")
  const data = await (
    await client.maps[":slug"].$get({ param: { slug: mapName } })
  ).json()

  if ("error" in data) {
    notFound()
  }

  return <MapPage map={data.result} />
}

export default Page
