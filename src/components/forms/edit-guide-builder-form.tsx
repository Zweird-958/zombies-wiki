"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PenSquare } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect } from "react"
import { useFieldArray, useForm, useFormState } from "react-hook-form"
import { toast } from "sonner"

import { client } from "@/api/client"
import EditGuideForm from "@/components/forms/edit-guide-form"
import EditStepForm from "@/components/forms/edit-step-form"
import { useEditor } from "@/components/guides/editor/use-editor"
import StepAccordionItem from "@/components/steps/step-accordion-item"
import { Accordion } from "@/components/ui/accordion/accordion"
import { Button } from "@/components/ui/button"
import { Form, FormWrapper } from "@/components/ui/form"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { EditGuideSchema } from "@/schemas/guides"
import { EditStepSchema } from "@/schemas/steps"
import type { EditGuide, FormattedGuide } from "@/types/guides"
import type { EditStep } from "@/types/steps"

// eslint-disable-next-line max-lines-per-function
const EditGuideBuilderForm = ({ guide }: { guide: FormattedGuide }) => {
  const t = useTranslations("forms.editGuide")
  const errorsT = useTranslations("errors")
  const { onError } = useError("editGuide")
  const { editor } = useEditor()

  const form = useForm({
    defaultValues: {
      name: guide.name,
      mapId: guide.mapId,
      steps: guide.steps.map((step) => ({
        stepId: step.id,
        name: step.name,
        content: step.content,
      })),
    },
    resolver: zodResolver(EditGuideSchema),
  })

  const {
    fields: steps,
    append: addStep,
    insert,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "steps",
  })

  const stepForm = useForm({
    defaultValues: { stepId: "", name: "", content: [] },
    resolver: zodResolver(EditStepSchema),
  })

  const editStep = (data: EditStep) => {
    const index = steps.findIndex((step) => step.stepId === data.stepId)

    if (index !== -1) {
      remove(index)
      insert(index, data)
    }
  }

  const { errors } = useFormState({ control: form.control, name: "steps" })

  const { mutate: editGuide, isPending } = useMutation(
    client.guides[":id"].$patch,
    {
      onSuccess: () => {
        toast.success(t("success"))
      },
      onError,
    },
  )

  const onSubmit = (data: EditGuide) => {
    editGuide({
      param: { id: guide.id },
      form: {
        name: data.name ?? "",
        mapId: data.mapId ?? "",
        steps: JSON.stringify(data.steps),
        image: data.image ?? "",
      },
    })
  }

  useEffect(() => {
    const errorMessage = errors.steps?.message

    if (Object.keys(errors).length === 1 && errorMessage) {
      toast.error(errorsT(`steps.${errorMessage}`))
    }
  }, [errors, errorsT])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="relative mx-auto size-48">
        <Image
          className="rounded-md object-cover"
          fill
          src={guide.image}
          alt={guide.name}
        />
      </div>

      <Form {...form}>
        <FormWrapper
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col justify-center gap-12 sm:flex-row [&>div]:w-full [&>div]:max-w-[400px]"
        >
          <EditGuideForm isPending={isPending} />
          <EditStepForm
            addStep={addStep}
            stepForm={stepForm}
            editStep={editStep}
          />
        </FormWrapper>
      </Form>
      <Accordion>
        {steps.map((step) => (
          <StepAccordionItem key={step.id} {...step}>
            <Button size="icon">
              <PenSquare
                onClick={() => {
                  stepForm.setValue("stepId", step.id)
                  stepForm.setValue("name", step.name)
                  stepForm.setValue("content", step.content)
                  editor.commands.setContent(step.content)
                }}
              />
            </Button>
          </StepAccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default EditGuideBuilderForm
