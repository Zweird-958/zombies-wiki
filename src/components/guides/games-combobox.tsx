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
import {
  FormComboboxInput,
  FormError,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useQuery } from "@/hooks/use-query"

type Props = {
  value: string
  onValueChange: (value: string) => void
}

const GamesCombobox = (props: Props) => {
  const t = useTranslations("forms.createGuide")

  const { data, isPending } = useQuery(client.games.$get, {
    queryKey: ["games-combobox"],
  })

  const items = useMemo(() => {
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
    <FormField
      name="gameId"
      render={() => (
        <FormItem>
          <Combobox
            items={items}
            defaultValue=""
            disabled={isPending}
            {...props}
          >
            <FormLabel isField={false}>{t("game.label")}</FormLabel>
            <ComboboxTrigger />
            <FormError />
            <ComboboxPopup>
              <FormComboboxInput
                name="gameId"
                placeholder={t("game.placeholder")}
              />
              <ComboboxSeparator />
              <ComboboxEmpty>{t("game.empty")}</ComboboxEmpty>
              <ComboboxList>
                {(item: { label: string; value: string }) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
        </FormItem>
      )}
    />
  )
}

export default GamesCombobox
