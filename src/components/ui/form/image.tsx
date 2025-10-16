"use client"

import { PlusIcon, X } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useDropzone } from "react-dropzone"

import { MAXIMUM_FILE_SIZE } from "@/api/utils/constants"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/ui/form/form-error"
import { useFormField } from "@/components/ui/form/hooks"
import { dropzone } from "@/components/ui/form/variants"

type FileDropzoneProps = {
  name: string
  label: string
  description?: string
} & Pick<
  ReturnType<typeof useDropzone>,
  "getRootProps" | "getInputProps" | "isDragActive"
>

export const FileDropzone = ({
  name,
  label,
  description,
  getRootProps,
  getInputProps,
  isDragActive,
}: FileDropzoneProps) => (
  <div {...getRootProps()}>
    <input name={name} {...getInputProps()} />

    <div className={dropzone({ isDragActive })}>
      <PlusIcon className="size-6" />
      <span className="font-semibold">{label}</span>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  </div>
)

type PreviewImageProps = {
  handleRemove: () => void
  value: File
}

export const PreviewImage = ({ handleRemove, value }: PreviewImageProps) => (
  <div className="relative mx-auto size-48">
    <Button
      className="absolute -top-2 -right-2 z-10 size-4 p-1"
      size="icon"
      color="danger"
      radius="full"
      onClick={handleRemove}
    >
      <X className="size-2" />
    </Button>
    <Image
      className="rounded-md object-cover"
      fill
      src={URL.createObjectURL(value)}
      alt={value.name}
    />
  </div>
)

export type InputImageControllerProps = {
  value: File | null
  onChange: (file: File | null) => void
} & Pick<FileDropzoneProps, "label" | "description">

export const InputImageController = ({
  onChange,
  value,
  label,
  description,
}: InputImageControllerProps) => {
  const { name } = useFormField()
  const t = useTranslations(`errors.${name}`)

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop: ([file]) => {
        onChange(file)
      },
      maxSize: MAXIMUM_FILE_SIZE,
      maxFiles: 1,
      multiple: false,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
      },
    })

  const handleRemove = () => onChange(null)

  const error = fileRejections.length > 0 && fileRejections[0].errors[0].code

  return (
    <>
      <div className="flex flex-col gap-4">
        <FileDropzone
          label={label}
          description={description}
          name={name}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
        {value && <PreviewImage handleRemove={handleRemove} value={value} />}
      </div>
      {error ? <FormError>{t(error)}</FormError> : <FormError />}
    </>
  )
}
