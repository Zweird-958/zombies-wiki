"use client"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { client } from "@/api/client"
import { Button } from "@/components/ui/button"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { cn } from "@/utils/cn"
import { routes } from "@/utils/routes"

const DeleteGame = ({ className }: { className?: string }) => {
  const t = useTranslations("forms.deleteGame")
  const { onError } = useError("deleteGame")
  const router = useRouter()
  const { game } = useParams<{ game: string }>()

  const { mutate: deleteGame, isPending: isDeleting } = useMutation(
    client.games[":slug"].$delete,
    {
      onSuccess: () => {
        toast.success(t("success"))
        router.replace(routes.home)
      },
      onError,
    },
  )

  return (
    <div className={cn("absolute right-4 bottom-4 flex gap-4", className)}>
      <Button
        size="icon"
        color="danger"
        onClick={() => deleteGame({ param: { slug: game } })}
        isPending={isDeleting}
      >
        <Trash2 />
      </Button>
    </div>
  )
}

export default DeleteGame
