"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useFieldArray, useForm, useFormState } from "react-hook-form"
import { toast } from "sonner"

import { client } from "@/api/client"
import CreateGuideForm from "@/components/forms/create-guide-form"
import CreateStepForm from "@/components/forms/create-step-form"
import StepAccordion from "@/components/steps/step-accordion"
import { Form, FormWrapper } from "@/components/ui/form"
import { useError } from "@/hooks/use-error"
import { useMutation } from "@/hooks/use-mutation"
import { CreateGuideSchema } from "@/schemas/guides"
import type { CreateGuide } from "@/types/guides"

const CreateGuideBuilderForm = () => {
  const t = useTranslations("forms.createGuide")
  const errorsT = useTranslations("errors")
  const { onError } = useError("createGuide")
  const form = useForm({
    defaultValues: {
      name: "",
      gameId: "",
      steps: [],
    },
    resolver: zodResolver(CreateGuideSchema),
  })
  const { fields: steps, append: addStep } = useFieldArray({
    control: form.control,
    name: "steps",
  })
  const { errors } = useFormState({ control: form.control, name: "steps" })

  const { mutate: createGuide, isPending } = useMutation(client.guides.$post, {
    onSuccess: () => {
      toast.success(t("success"))
    },
    onError,
  })

  const onSubmit = (data: CreateGuide) => {
    createGuide({ json: data })
  }

  useEffect(() => {
    const errorMessage = errors.steps?.message

    if (Object.keys(errors).length === 1 && errorMessage) {
      toast.error(errorsT(`steps.${errorMessage}`))
    }
  }, [errors, errorsT])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
      <Form {...form}>
        <FormWrapper
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col justify-center gap-12 sm:flex-row [&>div]:w-full [&>div]:max-w-[400px]"
        >
          <CreateGuideForm isPending={isPending} />
          <CreateStepForm addStep={addStep} />
        </FormWrapper>
      </Form>
      {steps.map((step) => (
        <StepAccordion key={step.id} {...step} />
      ))}
    </div>
  )
}

export default CreateGuideBuilderForm
