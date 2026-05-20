"use client"

import { useTranslations } from "next-intl"
import type { UseFormReturn } from "react-hook-form"

import { useEditor } from "@/components/guides/editor/use-editor"
import StepEditorInput from "@/components/steps/step-editor-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormFieldInput } from "@/components/ui/form"
import type { EditStep, StepParagraph } from "@/types/steps"

type Props = {
  addStep: (data: { name: string; content: StepParagraph[] }) => void
  editStep: (data: {
    stepId: string
    name: string
    content: StepParagraph[]
  }) => void
  stepForm: UseFormReturn<EditStep>
}

const EditStepForm = ({ addStep, editStep, stepForm }: Props) => {
  const t = useTranslations("forms.editStep")
  const { editor } = useEditor()
  const onSubmit = (data: EditStep) => {
    if (data.stepId) {
      editStep(data as Required<EditStep>)
    } else {
      addStep(data)
    }

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
          <FormField
            name="content"
            render={({ field }) => (
              <StepEditorInput onChange={field.onChange} />
            )}
          />
          <Button
            className="w-full"
            type="submit"
            onClick={stepForm.handleSubmit(onSubmit)}
          >
            {t("submit")}
          </Button>
        </CardContent>
      </Card>
    </Form>
  )
}

export default EditStepForm
