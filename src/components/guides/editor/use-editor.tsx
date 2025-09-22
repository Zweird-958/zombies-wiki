"use client"

import {
  type Editor,
  useEditorState,
  useEditor as useEditorTipTap,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { type PropsWithChildren, createContext, useContext } from "react"

import type { StepParagraph } from "@/types/steps"

type EditorContextValue = {
  editor: Editor
  editorState: {
    bold: boolean
    underline: boolean
    content: StepParagraph[]
  }
}

const EditorContext = createContext<EditorContextValue | null>(null)

export const EditorProvider = ({ children }: PropsWithChildren) => {
  const editor = useEditorTipTap({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  })

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      bold: ctx.editor?.isActive("bold") ?? false,
      underline: ctx.editor?.isActive("underline") ?? false,
      content: (ctx.editor?.getJSON().content ?? []) as StepParagraph[],
    }),
  })

  if (!editor || !editorState) {
    return null
  }

  return (
    <EditorContext.Provider value={{ editor, editorState }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider")
  }

  return context
}
