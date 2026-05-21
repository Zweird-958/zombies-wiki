"use client"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { client } from "@/api/client"
import { Button } from "@/components/ui/button"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { routes } from "@/utils/routes"

const DeleteMap = () => {
  const t = useTranslations("forms.deleteMap")
  const { onError } = useError("deleteMap")
  const router = useRouter()
  const { game, map } = useParams<{ game: string; map: string }>()

  const { mutate: deleteMap, isPending: isDeleting } = useMutation(
    client.maps[":slug"].$delete,
    {
      onSuccess: () => {
        toast.success(t("success"))
        router.replace(routes.game(game))
      },
      onError,
    },
  )

  return (
    <div className="absolute right-4 bottom-4 flex gap-4">
      <Button
        size="icon"
        color="danger"
        onClick={() => deleteMap({ param: { slug: map } })}
        isPending={isDeleting}
      >
        <Trash2 />
      </Button>
    </div>
  )
}

export default DeleteMap
