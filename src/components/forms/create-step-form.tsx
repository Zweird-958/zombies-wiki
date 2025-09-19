"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import OptionButton from "@/components/guides/editor/option-button"
import { useEditor } from "@/components/guides/editor/use-editor"
import StepEditorInput from "@/components/steps/step-editor-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormFieldInput } from "@/components/ui/form"
import { CreateStepSchema } from "@/schemas/steps"
import type { CreateStep } from "@/types/steps"

type Props = {
  addStep: (data: { content: string; name: string }) => void
}

const CreateStepForm = ({ addStep }: Props) => {
  const t = useTranslations("forms.createStep")
  const { editor } = useEditor()
  const stepForm = useForm({
    defaultValues: { name: "", content: "" },
    resolver: zodResolver(CreateStepSchema),
  })

  const onSubmit = (data: CreateStep) => {
    addStep(data)
    editor.commands.clearContent()
    stepForm.reset()
  }

  return (
    <Form {...stepForm}>
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FormFieldInput
            name="name"
            label={t("name.label")}
            placeholder={t("name.placeholder")}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <OptionButton option="bold" />
              <OptionButton option="underline" />
            </div>
            <FormField
              name="content"
              render={({ field }) => <StepEditorInput field={field} />}
            />
          </div>
          <Button className="w-full" onClick={stepForm.handleSubmit(onSubmit)}>
            {t("submit")}
          </Button>
        </CardContent>
      </Card>
    </Form>
  )
}

export default CreateStepForm
