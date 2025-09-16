"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { client } from "@/api/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormFieldInput } from "@/components/ui/form"
import { useMutation } from "@/hooks/use-mutation"
import { CreateGameSchema } from "@/schemas/games"
import type { CreateGame } from "@/types/games"

const CreateGameForm = () => {
  const t = useTranslations("forms.createGame")
  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateGameSchema),
  })

  const { mutate: createGame } = useMutation(client.games.$post, {
    onSuccess: () => {
      toast.success(t("success"))
    },
    onError: (error) => {
      toast.error(t(error.code))
    },
  })

  const onSubmit = (data: CreateGame) => {
    createGame({ json: data })
  }

  return (
    <Card className="w-full max-w-[300px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormFieldInput
              name="name"
              label={t("name.label")}
              placeholder={t("name.placeholder")}
            />

            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CreateGameForm
