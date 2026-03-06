"use client"

import { type ReactNode, createContext, useContext } from "react"

import { client } from "@/api/client"
import { useQuery } from "@/hooks/use-query"

type ImagesContextValue = {
  images: {
    id: string
    url: string
  }[]
}

const ImagesContext = createContext<ImagesContextValue>({
  images: [],
})

export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const { data: { result: images = [] } = {} } = useQuery(client.images.$get, {
    queryKey: ["images"],
  })

  return (
    <ImagesContext.Provider value={{ images }}>
      {children}
    </ImagesContext.Provider>
  )
}

export const useImages = () => useContext(ImagesContext)
