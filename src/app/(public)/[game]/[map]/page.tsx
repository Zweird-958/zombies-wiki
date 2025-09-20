import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { client } from "@/api/client"
import GuideCard from "@/components/guides/guide-card"

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
    <div className="mx-auto w-full max-w-6xl px-8">
      <h1 className="pb-8 text-center text-xl font-semibold">
        {t("title", { game: data.result.game, map: data.result.name })}
      </h1>
      <div className="flex w-full flex-wrap justify-center gap-8">
        {data.result.guides.map((guide) => (
          <GuideCard key={guide.id} game={game} map={mapName} {...guide} />
        ))}
      </div>
    </div>
  )
}

export default Page
