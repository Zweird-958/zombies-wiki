import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { client } from "@/api/client"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { FormError, FormInput, FormItem, FormLabel } from "@/components/ui/form"
import { useQuery } from "@/hooks/use-query"

type Item = { label: string; value: string }

type Props = {
  value: string
  onValueChange: (value: string) => void
}

const GamesCombobox = ({ value, ...props }: Props) => {
  const t = useTranslations("forms.createMap")

  const { data, isPending } = useQuery(client.games.$get, {
    queryKey: ["games-combobox"],
  })

  const items = useMemo<Item[]>(() => {
    const commonItems = [{ label: t("game.placeholder"), value: "" }]

    if (data) {
      return [
        ...commonItems,
        ...data.result.map((game) => ({
          label: game.name,
          value: game.id,
        })),
      ]
    }

    return commonItems
  }, [data, t])

  return (
    <FormItem>
      <Combobox
        items={items}
        defaultValue=""
        disabled={isPending}
        value={isPending ? "" : value}
        {...props}
      >
        <FormLabel>{t("game.label")}</FormLabel>
        <ComboboxTrigger />
        <FormError />
        <ComboboxPopup>
          <FormInput
            inputType="combobox"
            name="gameId"
            placeholder={t("game.placeholder")}
          />
          <ComboboxSeparator />
          <ComboboxEmpty>{t("game.empty")}</ComboboxEmpty>
          <ComboboxList>
            {(item: Item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </FormItem>
  )
}

export default GamesCombobox
