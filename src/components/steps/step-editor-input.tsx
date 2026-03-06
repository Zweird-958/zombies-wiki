"use client"

import { EditorContent } from "@tiptap/react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

import EditorToolbar from "@/components/guides/editor/editor-toolbar"
import { useEditor } from "@/components/guides/editor/use-editor"
import { FormError, FormItem, FormLabel } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImagesProvider } from "@/hooks/use-images"
import type { StepParagraph } from "@/types/steps"

type Props = {
  onChange: (value: StepParagraph[]) => void
}

const StepEditorInput = ({ onChange }: Props) => {
  const { editor, editorState } = useEditor()
  const t = useTranslations("forms.createStep")

  useEffect(() => {
    onChange(editorState.content)
  }, [editorState.content, onChange])

  return (
    <FormItem>
      <FormLabel>{t("content.label")}</FormLabel>
      <ImagesProvider>
        <EditorToolbar />
      </ImagesProvider>
      <ScrollArea className="[&_[data-slot=scroll-area-content]]:h-full [&_[data-slot=scroll-area-content]]:p-0">
        <EditorContent
          editor={editor}
          className="image:text-image h-full *:h-full *:px-4 *:py-3 *:focus:outline-none *:[&>p]:last:pb-3"
        />
      </ScrollArea>
      <FormError />
    </FormItem>
  )
}

export default StepEditorInput
