import { useTranslations } from "next-intl"
import { useMemo } from "react"

import { client } from "@/api/client"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import { FormError, FormInput, FormItem, FormLabel } from "@/components/ui/form"
import { useQuery } from "@/hooks/use-query"

type Item = {
  label: string
  value: string
}

type GroupItems = Item & { items: Item[] }

type Props = {
  value: string
  onValueChange: (value: string) => void
}

const MapsCombobox = ({ value, ...props }: Props) => {
  const t = useTranslations("forms.createGuide")

  const { data, isPending } = useQuery(
    () => client.games.$get({ query: { maps: "true" } }),
    {
      queryKey: ["games-combobox"],
    },
  )

  const items = useMemo<GroupItems[]>(() => {
    const commonItems = [
      {
        label: "",
        value: "",
        items: [{ label: t("map.placeholder"), value: "" }],
      },
    ]

    if (data) {
      return [
        ...commonItems,
        ...data.result.map((game) => ({
          label: game.name,
          value: game.id,
          items:
            game.maps?.map((map) => ({ label: map.name, value: map.id })) ?? [],
        })),
      ]
    }

    return commonItems
  }, [data, t])

  return (
    <FormItem>
      <Combobox
        items={items}
        disabled={isPending}
        value={isPending ? "" : value}
        {...props}
      >
        <FormLabel>{t("map.label")}</FormLabel>
        <ComboboxTrigger />
        <FormError />
        <ComboboxPopup>
          <FormInput
            inputType="combobox"
            name="mapId"
            placeholder={t("map.placeholder")}
          />
          <ComboboxSeparator />
          <ComboboxEmpty>{t("map.empty")}</ComboboxEmpty>
          <ComboboxList>
            {(item: GroupItems) =>
              item.value && (
                <ComboboxGroup key={item.value} items={item.items}>
                  <ComboboxGroupLabel className="px-0.5 py-2">
                    {item.label}
                  </ComboboxGroupLabel>
                  {item.items.map((map) => (
                    <ComboboxItem key={map.value} value={map.value}>
                      {map.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              )
            }
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </FormItem>
  )
}

export default MapsCombobox
