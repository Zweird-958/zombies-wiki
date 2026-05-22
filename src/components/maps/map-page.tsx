"use client"

import { PenSquare } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { type Dispatch, type SetStateAction, useState } from "react"

import EditMapForm from "@/components/forms/edit-map-form"
import GuideCard from "@/components/guides/guide-card"
import ItemsLayout from "@/components/items/items-layout"
import DeleteMap from "@/components/maps/delete-map"
import { Button } from "@/components/ui/button"
import type { FormattedMap } from "@/types/maps"
import { authClient } from "@/utils/auth/auth-client"

const AdminButtons = ({
  setEdit,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>
}) => {
  const toggleEdit = () => setEdit((prev) => !prev)

  return (
    <div className="absolute right-4 bottom-4 flex gap-4">
      <Button size="icon" onClick={toggleEdit}>
        <PenSquare />
      </Button>
      <DeleteMap />
    </div>
  )
}

const MapPage = ({ map }: { map: FormattedMap }) => {
  const admin = authClient.useSession().data?.user.role === "admin"
  const [edit, setEdit] = useState(false)
  const t = useTranslations("maps")

  if (admin && edit) {
    return (
      <div className="flex size-full flex-col items-center gap-8 rounded-md p-8">
        <div className="relative mx-auto size-48">
          <Image
            className="rounded-md object-cover"
            fill
            src={map.image}
            alt={map.name}
          />
        </div>

        <AdminButtons setEdit={setEdit} />
        <EditMapForm map={map} setEdit={setEdit} />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      {admin && <AdminButtons setEdit={setEdit} />}

      <ItemsLayout name={t("title", { game: map.game, map: map.name })}>
        {map.guides.map((guide) => (
          <GuideCard key={guide.id} game={map.game} map={map.name} {...guide} />
        ))}
      </ItemsLayout>
    </div>
  )
}

export default MapPage
