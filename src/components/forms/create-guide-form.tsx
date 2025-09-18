"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { client } from "@/api/client"
import GamesCombobox from "@/components/guides/games-combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormFieldInput, FormWrapper } from "@/components/ui/form"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { CreateGuideSchema } from "@/schemas/guides"
import type { CreateGuide } from "@/types/guides"

const CreateGameForm = () => {
  const t = useTranslations("forms.createGuide")
  const { onError } = useError("createGuide")
  const form = useForm({
    defaultValues: {
      name: "",
      gameId: "",
    },
    resolver: zodResolver(CreateGuideSchema),
  })

  const { mutate: createGuide, isPending } = useMutation(client.guides.$post, {
    onSuccess: () => {
      toast.success(t("success"))
    },
    onError,
  })

  const onSubmit = (data: CreateGuide) => {
    createGuide({ json: data })
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

            <GamesCombobox
              value={form.watch("gameId")}
              onValueChange={(value) => form.setValue("gameId", value)}
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
