"use client"

import { EditorContent } from "@tiptap/react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import type { ControllerRenderProps, FieldValues } from "react-hook-form"

import { useEditor } from "@/components/guides/editor/use-editor"
import { FormError, FormItem, FormLabel } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scrollbar"

type Props = {
  field: ControllerRenderProps<FieldValues, "content">
}

const StepEditorInput = ({ field }: Props) => {
  const { editor, editorState } = useEditor()
  const t = useTranslations("forms.createStep")

  useEffect(() => {
    field.onChange(editorState.content)
  }, [editorState.content, field])

  return (
    <FormItem>
      <FormLabel>{t("content.label")}</FormLabel>
      <ScrollArea className="[&_[data-slot=scroll-area-content]]:h-full [&_[data-slot=scroll-area-content]]:p-0">
        <EditorContent
          editor={editor}
          className="h-full *:h-full *:px-4 *:py-3 *:**:last:pb-3 *:focus:outline-none"
        />
      </ScrollArea>
      <FormError />
    </FormItem>
  )
}

export default StepEditorInput
