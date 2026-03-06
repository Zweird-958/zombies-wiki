"use client"

import { ImageIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { type MouseEvent, useState } from "react"

import { useEditor } from "@/components/guides/editor/use-editor"
import {
  Dialog,
  DialogContent,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog"
import { Toggle } from "@/components/ui/toggle"
import { useImages } from "@/hooks/use-images"

const ImageOptionButton = () => {
  const { editor } = useEditor()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("forms.createStep.image")

  const { images } = useImages()

  const handleSelectImage = (event: MouseEvent<HTMLButtonElement>) => {
    const { imageUrl } = event.currentTarget.dataset as { imageUrl: string }

    editor
      .chain()
      .focus()
      .toggleImage({
        imageUrl,
      })
      .run()

    setIsOpen(false)
  }

  const handleToggleImage = () => {
    if (editor.isActive("image")) {
      editor.chain().focus().unsetImage().run()

      return
    }

    setIsOpen(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Toggle onClick={handleToggleImage} pressed={editor.isActive("image")}>
        <ImageIcon />
      </Toggle>

      <DialogPopup className="w-[1000px]">
        <DialogTitle className="text-lg font-medium">{t("title")}</DialogTitle>
        <DialogContent className="flex flex-wrap justify-center gap-4 py-2">
          {images.length === 0 ? (
            <p>{t("empty")}</p>
          ) : (
            images.map(({ id, url }) => (
              <button
                key={id}
                className="group relative h-[180px] w-full max-w-[280px] outline-0"
                data-image-url={url}
                onClick={handleSelectImage}
              >
                <Image
                  src={url}
                  alt={id}
                  fill
                  className="rounded-lg object-cover transition-transform group-hover:scale-105"
                />
              </button>
            ))
          )}
        </DialogContent>
      </DialogPopup>
    </Dialog>
  )
}

export default ImageOptionButton
