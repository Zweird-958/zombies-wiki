import { useTranslations } from "next-intl"
import { toast } from "sonner"

import type { ApiClientError } from "@/api/errors"
import type { AuthErrorCode, ErrorCode } from "@/types/api"

const GLOBAL_ERRORS_CODES: (ErrorCode | AuthErrorCode)[] = [
  "SOMETHING_WENT_WRONG",
  "FORBIDDEN",
  "UNAUTHORIZED",
]

export const useError = (key: string) => {
  const t = useTranslations(`errors.${key}`)
  const errorT = useTranslations("errors")

  const onError = ({ code }: ApiClientError) => {
    if (GLOBAL_ERRORS_CODES.includes(code)) {
      toast.error(errorT(code))

      return
    }

    toast.error(t(code))
  }

  return { onError }
}
