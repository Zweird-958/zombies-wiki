"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
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
import { CreateMapSchema } from "@/schemas/maps"
import type { CreateMap } from "@/types/maps"
import { routes } from "@/utils/routes"

const CreateMapForm = () => {
  const t = useTranslations("forms.createMap")
  const { onError } = useError("createMap")
  const router = useRouter()

  const defaultGame = useSearchParams().get("game")

  const form = useForm({
    defaultValues: {
      name: "",
      gameId: defaultGame ?? "",
    },
    resolver: zodResolver(CreateMapSchema),
  })

  const { mutate: createMap, isPending } = useMutation(client.maps.$post, {
    onSuccess: ({ result: { id } }) => {
      toast.success(t("success"))
      router.push(routes.admin.createGuide(id))
    },
    onError,
  })

  const onSubmit = (data: CreateMap) => {
    createMap({ form: data })
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

export default CreateMapForm
