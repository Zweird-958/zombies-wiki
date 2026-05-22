"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { client } from "@/api/client"
import GamesCombobox from "@/components/guides/games-combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormFieldInput,
  FormWrapper,
  ImageInputField,
} from "@/components/ui/form"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { EditMapSchema } from "@/schemas/maps"
import type { EditMap, FormattedMap } from "@/types/maps"
import { routes } from "@/utils/routes"

const EditMapForm = ({
  map,
  setEdit,
}: {
  map: FormattedMap
  setEdit: (edit: boolean) => void
}) => {
  const t = useTranslations("forms.editMap")
  const { onError } = useError("editMap")
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: map.name,
      gameId: map.gameId,
    },
    resolver: zodResolver(EditMapSchema),
  })

  const { mutate: updateMap, isPending } = useMutation(
    client.maps[":slug"].$patch,
    {
      onSuccess: ({ result: { slug, game } }) => {
        toast.success(t("success"))
        setEdit(false)
        void router.replace(routes.map(game, slug))
      },
      onError,
    },
  )

  const onSubmit = (data: EditMap) => {
    updateMap({
      param: { slug: map.slug },
      form: {
        image: data.image ?? "",
        name: data.name ?? "",
        gameId: data.gameId ?? "",
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

            <FormField
              name="gameId"
              render={({ field: { value, onChange } }) => (
                <GamesCombobox
                  value={value as string}
                  onValueChange={onChange}
                />
              )}
            />

            <ImageInputField
              label={t("image.label")}
              description={t("image.description")}
              name="image"
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

export default EditMapForm
