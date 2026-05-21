"use client"

import { PenSquare } from "lucide-react"
import { useState } from "react"

import EditGuideBuilderForm from "@/components/forms/edit-guide-builder-form"
import { EditorProvider } from "@/components/guides/editor/use-editor"
import StepAccordionItem from "@/components/steps/step-accordion-item"
import { Accordion } from "@/components/ui/accordion/accordion"
import { Button } from "@/components/ui/button"
import type { FormattedGuide } from "@/types/guides"
import { authClient } from "@/utils/auth/auth-client"

const GuidePage = ({ guide }: { guide: FormattedGuide }) => {
  const admin = authClient.useSession().data?.user.role === "admin"
  const [edit, setEdit] = useState(false)

  if (admin && edit) {
    return (
      <EditorProvider>
        <Button
          className="absolute right-4 bottom-4"
          size="icon"
          onClick={() => setEdit(false)}
        >
          <PenSquare />
        </Button>
        <EditGuideBuilderForm guide={guide} />
      </EditorProvider>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <Button
        className="absolute right-4 bottom-4"
        size="icon"
        onClick={() => setEdit(true)}
      >
        <PenSquare />
      </Button>
      <h1 className="pb-8 text-center text-xl font-semibold">{guide.name}</h1>
      <Accordion defaultValue={guide.steps.map((step) => step.id)}>
        {guide.steps.map((step) => (
          <StepAccordionItem key={step.id} {...step} />
        ))}
      </Accordion>
    </div>
  )
}

export default GuidePage
