"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { client } from "@/api/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormFieldInput,
  FormFieldNumberInput,
  FormWrapper,
  ImageInputField,
} from "@/components/ui/form"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { EditGameSchema } from "@/schemas/games"
import type { EditGame, FormattedGame } from "@/types/games"
import { routes } from "@/utils/routes"

const EditGameForm = ({
  game,
  setEdit,
}: {
  game: FormattedGame
  setEdit: (edit: boolean) => void
}) => {
  const t = useTranslations("forms.editGame")
  const { onError } = useError("editGame")
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: game.name,
      releaseYear: game.releaseYear,
    },
    resolver: zodResolver(EditGameSchema),
  })

  const { mutate: editGame, isPending } = useMutation(
    client.games[":slug"].$patch,
    {
      onSuccess: ({ result: { slug } }) => {
        toast.success(t("success"))
        setEdit(false)
        void router.replace(routes.game(slug))
      },
      onError,
    },
  )

  const onSubmit = (data: EditGame) => {
    editGame({
      param: {
        slug: game.slug,
      },
      form: {
        image: data.image ?? "",
        name: data.name ?? "",
        releaseYear: (data.releaseYear ?? 0) as unknown as string,
      },
    })
  }

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <FormFieldInput
              name="name"
              label={t("name.label")}
              placeholder={t("name.placeholder")}
            />
            <ImageInputField
              label={t("image.label")}
              description={t("image.description")}
              name="image"
            />
            <FormFieldNumberInput
              name="releaseYear"
              label={t("releaseYear.label")}
              placeholder={t("releaseYear.placeholder")}
            />

            <Button type="submit" className="w-full" isPending={isPending}>
              {t("submit")}
            </Button>
          </FormWrapper>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditGameForm
