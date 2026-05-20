"use client"

import { useTranslations } from "next-intl"

import MapsCombobox from "@/components/guides/maps-combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormField,
  FormFieldInput,
  ImageInputField,
} from "@/components/ui/form"

type Props = {
  isPending: boolean
}

const EditGuideForm = ({ isPending }: Props) => {
  const t = useTranslations("forms.editGuide")

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 *:w-full">
        <FormFieldInput
          name="name"
          label={t("name.label")}
          placeholder={t("name.placeholder")}
        />

        <FormField
          name="mapId"
          render={({ field: { value, onChange } }) => (
            <MapsCombobox value={value as string} onValueChange={onChange} />
          )}
        />

        <ImageInputField
          label={t("image.label")}
          description={t("image.description")}
          name="image"
        />

        <Button type="submit" className="w-full" isPending={isPending}>
          {t("submit")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default EditGuideForm
