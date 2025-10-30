"use client"

import { type ReactNode, createContext, useContext } from "react"

import { combobox } from "@/components/ui/combobox/variants"

type ComboboxContextValue = {
  inputPlacement: "inside" | "outside"
  styles: ReturnType<typeof combobox>
}

const ComboboxContext = createContext<ComboboxContextValue>(
  {} as ComboboxContextValue,
)

export type ComboboxProviderProps = {
  children: ReactNode
  inputPlacement?: "inside" | "outside"
}

export const ComboboxProvider = ({
  children,
  inputPlacement = "outside",
}: ComboboxProviderProps) => {
  const styles = combobox({ placement: inputPlacement })

  return (
    <ComboboxContext value={{ inputPlacement, styles }}>
      {children}
    </ComboboxContext>
  )
}

export const useCombobox = () => useContext(ComboboxContext)
