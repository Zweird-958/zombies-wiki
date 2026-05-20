import { notFound } from "next/navigation"

import { client } from "@/api/client"
import GuidePage from "@/components/guides/guide-page"

type Props = {
  params: Promise<{ game: string; "guide-id": string }>
}

const Page = async ({ params }: Props) => {
  const { "guide-id": guideId } = await params
  const response = await client.guides[":id"].$get({ param: { id: guideId } })
  const data = await response.json()

  if ("error" in data) {
    notFound()
  }

  return <GuidePage guide={data.result} />
}

export default Page
