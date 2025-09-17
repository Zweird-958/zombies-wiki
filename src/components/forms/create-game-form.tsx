"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
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
import { CreateGameSchema } from "@/schemas/games"
import type { CreateGame } from "@/types/games"

const CreateGameForm = () => {
  const t = useTranslations("forms.createGame")
  const { onError } = useError("createGame")
  const form = useForm({
    defaultValues: {
      name: "",
      releaseYear: "",
    },
    resolver: zodResolver(CreateGameSchema),
  })

  const { mutate: createGame, isPending } = useMutation(client.games.$post, {
    onSuccess: () => {
      toast.success(t("success"))
    },
    onError,
  })

  const onSubmit = (data: CreateGame) => {
    createGame({
      form: {
        ...data,
        releaseYear: data.releaseYear.toString(),
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

export default CreateGameForm
