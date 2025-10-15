import { Field } from "@base-ui-components/react/field"
import { useTranslations } from "next-intl"

import { useFormField } from "@/components/ui/form/hooks"
import type { FormErrorProps } from "@/components/ui/form/types"
import { cn } from "@/utils/cn"

export const FormError = ({ className, ...props }: FormErrorProps) => {
  const { error, formMessageId, name } = useFormField()
  const t = useTranslations(`errors.${name}`)
  const body = error?.message ? String(t(error.message)) : props.children

  if (!body) {
    return null
  }

  return (
    <Field.Error
      data-slot="form-error"
      data-error={Boolean(error)}
      id={formMessageId}
      className={cn("text-danger text-sm", className)}
      match={Boolean(error)}
      {...props}
    >
      {body}
    </Field.Error>
  )
}
