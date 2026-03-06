"use client"

import { ImageIcon } from "lucide-react"

import { useEditor } from "@/components/guides/editor/use-editor"
import { Toggle } from "@/components/ui/toggle"
import { useImages } from "@/hooks/use-images"

const ImageOptionButton = () => {
  const { editor } = useEditor()
  const { handleToggleImage } = useImages()

  return (
    <Toggle onClick={handleToggleImage} pressed={editor.isActive("image")}>
      <ImageIcon />
    </Toggle>
  )
}

export default ImageOptionButton
