import { notFound } from "next/navigation"

import { client } from "@/api/client"
import StepAccordionItem from "@/components/steps/step-accordion-item"
import { Accordion } from "@/components/ui/accordion/accordion"

type Props = {
  params: Promise<{ game: string; "guide-id": string }>
}

const GuidePage = async ({ params }: Props) => {
  const { "guide-id": guideId } = await params
  const response = await client.guides[":id"].$get({ param: { id: guideId } })
  const data = await response.json()

  if ("error" in data) {
    notFound()
  }

  const { name, steps } = data.result

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <h1 className="pb-8 text-center text-xl font-semibold">{name}</h1>
      <Accordion defaultValue={steps.map((step) => step.id)}>
        {steps.map((step) => (
          <StepAccordionItem key={step.id} {...step} />
        ))}
      </Accordion>
    </div>
  )
}

export default GuidePage
