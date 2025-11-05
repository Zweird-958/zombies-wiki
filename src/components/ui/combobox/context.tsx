"use client"

import { type ReactNode, createContext, useContext } from "react"

import { combobox } from "@/components/ui/combobox/variants"

type ComboboxContextValue = {
  inputPlacement: "inside" | "outside"
  styles: ReturnType<typeof combobox>
  multiple: boolean
}

const ComboboxContext = createContext<ComboboxContextValue>(
  {} as ComboboxContextValue,
)

export type ComboboxProviderProps = {
  children: ReactNode
  inputPlacement?: "inside" | "outside"
  multiple?: boolean
}

export const ComboboxProvider = ({
  children,
  inputPlacement = "outside",
  multiple = false,
}: ComboboxProviderProps) => {
  const styles = combobox({ placement: inputPlacement, multiple })

  return (
    <ComboboxContext value={{ inputPlacement, styles, multiple }}>
      {children}
    </ComboboxContext>
  )
}

export const useCombobox = () => useContext(ComboboxContext)
