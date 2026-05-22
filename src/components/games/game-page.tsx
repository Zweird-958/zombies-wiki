"use client"

import { PenSquare } from "lucide-react"
import Image from "next/image"
import { type Dispatch, type SetStateAction, useState } from "react"

import EditGameForm from "@/components/forms/edit-game-form"
import DeleteGame from "@/components/games/delete-game"
import ItemsLayout from "@/components/items/items-layout"
import MapCard from "@/components/maps/map-card"
import { Button } from "@/components/ui/button"
import type { FormattedGame } from "@/types/games"
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
      <DeleteGame className="static" />
    </div>
  )
}

const GamePage = ({ game }: { game: FormattedGame }) => {
  const admin = authClient.useSession().data?.user.role === "admin"
  const [edit, setEdit] = useState(false)

  if (admin && edit) {
    return (
      <div className="flex size-full flex-col items-center gap-8 rounded-md p-8">
        <div className="relative mx-auto size-48">
          <Image
            className="rounded-md object-cover"
            fill
            src={game.image}
            alt={game.name}
          />
        </div>

        <AdminButtons setEdit={setEdit} />
        <EditGameForm game={game} setEdit={setEdit} />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      {admin && <AdminButtons setEdit={setEdit} />}

      <ItemsLayout name={game.name}>
        {game.maps.map((map) => (
          <MapCard key={map.id} game={game.slug} {...map} />
        ))}
      </ItemsLayout>
    </div>
  )
}

export default GamePage
