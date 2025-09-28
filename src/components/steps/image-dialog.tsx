"use client"

import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { type ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogPopup,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  imageUrl: string
  children: ReactNode
}

const ImageDialog = ({ children, imageUrl }: Props) => (
  <Dialog>
    <DialogTrigger className="text-image svg-not-size:size-4 inline-flex items-center gap-0.5 outline-0">
      {children}
      <ImageIcon />
    </DialogTrigger>

    <DialogPopup className="w-full p-0 xl:max-w-[1200px]">
      <DialogContent className="p-0">
        <Image
          src={imageUrl}
          alt="Step image"
          width={1920}
          height={1080}
          className="rounded-lg object-cover"
        />
      </DialogContent>
    </DialogPopup>
  </Dialog>
)

export default ImageDialog
