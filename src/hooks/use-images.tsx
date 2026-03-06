"use client"

import { type ReactNode, createContext, useContext, useState } from "react"

import { client } from "@/api/client"
import { useEditor } from "@/components/guides/editor/use-editor"
import { useQuery } from "@/hooks/use-query"

type ImagesContextValue = {
  images: {
    id: string
    url: string
  }[]
  refetch: () => Promise<void>
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleToggleImage: () => void
}

const ImagesContext = createContext<ImagesContextValue>(
  {} as ImagesContextValue,
)

export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { editor } = useEditor()
  const { data: { result: images = [] } = {}, refetch } = useQuery(
    client.images.$get,
    {
      queryKey: ["images"],
    },
  )

  const handleRefetch = async () => {
    await refetch()
  }

  const handleToggleImage = () => {
    if (editor.isActive("image")) {
      editor.chain().focus().unsetImage().run()

      return
    }

    setIsOpen(true)
  }

  return (
    <ImagesContext.Provider
      value={{
        images,
        refetch: handleRefetch,
        isOpen,
        setIsOpen,
        handleToggleImage,
      }}
    >
      {children}
    </ImagesContext.Provider>
  )
}

export const useImages = () => useContext(ImagesContext)
