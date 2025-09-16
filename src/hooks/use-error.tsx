import { useTranslations } from "next-intl"
import { toast } from "sonner"

import type { ApiClientError } from "@/api/errors"

const useError = (key: string) => {
  const t = useTranslations(`errors.${key}`)
  const errorT = useTranslations("errors")

  const onError = ({ code }: ApiClientError) => {
    if (code === "SOMETHING_WENT_WRONG") {
      toast.error(errorT("SOMETHING_WENT_WRONG"))

      return
    }

    toast(t(code))
  }

  return { onError }
}

export default useError
