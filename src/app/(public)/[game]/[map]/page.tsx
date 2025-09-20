import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { client } from "@/api/client"
import GuideCard from "@/components/guides/guide-card"
import ItemsLayout from "@/components/items/items-layout"

type Props = {
  params: Promise<{ game: string; map: string }>
}

const Page = async ({ params }: Props) => {
  const { map: mapName, game } = await params
  const t = await getTranslations("maps")
  const data = await (
    await client.maps[":name"].$get({ param: { name: mapName } })
  ).json()

  if ("error" in data) {
    notFound()
  }

  return (
    <ItemsLayout
      name={t("title", { game: data.result.game, map: data.result.name })}
    >
      {data.result.guides.map((guide) => (
        <GuideCard key={guide.id} game={game} map={mapName} {...guide} />
      ))}
    </ItemsLayout>
  )
}

export default Page
