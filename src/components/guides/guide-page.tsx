"use client"

import { PenSquare, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { client } from "@/api/client"
import EditGuideBuilderForm from "@/components/forms/edit-guide-builder-form"
import { EditorProvider } from "@/components/guides/editor/use-editor"
import StepAccordionItem from "@/components/steps/step-accordion-item"
import { Accordion } from "@/components/ui/accordion/accordion"
import { Button } from "@/components/ui/button"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import type { FormattedGuide } from "@/types/guides"
import { authClient } from "@/utils/auth/auth-client"
import { routes } from "@/utils/routes"

const AdminButtons = ({ onEditClick }: { onEditClick: () => void }) => {
  const t = useTranslations("forms.deleteGuide")
  const { onError } = useError("deleteGuide")
  const router = useRouter()
  const {
    game,
    map,
    "guide-id": guideId,
  } = useParams<{ game: string; map: string; "guide-id": string }>()

  const { mutate: deleteGuide, isPending: isDeleting } = useMutation(
    client.guides[":id"].$delete,
    {
      onSuccess: () => {
        toast.success(t("success"))
        router.replace(routes.map(game, map))
      },
      onError,
    },
  )

  return (
    <div className="absolute right-4 bottom-4 flex gap-4">
      <Button size="icon" onClick={onEditClick}>
        <PenSquare />
      </Button>
      <Button
        size="icon"
        color="danger"
        onClick={() => deleteGuide({ param: { id: guideId } })}
        isPending={isDeleting}
      >
        <Trash2 />
      </Button>
    </div>
  )
}

const GuidePage = ({ guide }: { guide: FormattedGuide }) => {
  const admin = authClient.useSession().data?.user.role === "admin"
  const [edit, setEdit] = useState(false)

  if (admin && edit) {
    return (
      <EditorProvider>
        <AdminButtons onEditClick={() => setEdit(false)} />
        <EditGuideBuilderForm guide={guide} />
      </EditorProvider>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      {admin && <AdminButtons onEditClick={() => setEdit(false)} />}

      <h1 className="pb-8 text-center text-xl font-semibold">{guide.name}</h1>
      <Accordion defaultValue={guide.steps.map((step) => step.id)}>
        {guide.steps.map((step) => (
          <StepAccordionItem key={step.id} {...step} />
        ))}
      </Accordion>
    </div>
  )
}

export default GuidePage
