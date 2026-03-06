"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { type MouseEvent } from "react"
import { useForm } from "react-hook-form"

import { client } from "@/api/client"
import { useEditor } from "@/components/guides/editor/use-editor"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormWrapper, ImageInputField } from "@/components/ui/form"
import { useImages } from "@/hooks/use-images"
import { useMutation } from "@/hooks/use-mutation"
import { CreateImageSchema } from "@/schemas/images"
import type { CreateImage } from "@/types/images"

const ImageOptionDialog = () => {
  const { editor } = useEditor()

  const t = useTranslations("forms.createStep.image")

  const { images, refetch, setIsOpen, isOpen } = useImages()

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

  const form = useForm({
    resolver: zodResolver(CreateImageSchema),
  })

  const { mutate: uploadImage, isPending } = useMutation(client.images.$post, {
    onSuccess: async () => {
      await refetch()
      form.reset()
    },
  })

  const handleUploadImage = (data: CreateImage) => {
    uploadImage({
      form: data,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogPopup className="w-[1000px]">
        <DialogTitle className="text-lg font-medium">{t("title")}</DialogTitle>
        <DialogContent className="flex flex-col gap-4 py-2">
          <div className="flex flex-wrap justify-center gap-4">
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
          </div>
          <Form {...form}>
            <FormWrapper onSubmit={form.handleSubmit(handleUploadImage)}>
              <ImageInputField
                name="image"
                label={t("label")}
                description={t("description")}
              />
              <Button type="submit" className="w-full" isPending={isPending}>
                {t("submit")}
              </Button>
            </FormWrapper>
          </Form>
        </DialogContent>
      </DialogPopup>
    </Dialog>
  )
}

export default ImageOptionDialog
