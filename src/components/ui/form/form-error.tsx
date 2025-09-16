import { Field } from "@base-ui-components/react/field"
import { useTranslations } from "next-intl"

import { useFormField } from "@/components/ui/form/hooks"
import type { FormErrorProps } from "@/components/ui/form/types"
import { form } from "@/components/ui/form/variants"

export const FormError = ({ className, ...props }: FormErrorProps) => {
  const { error, formMessageId, name } = useFormField()
  const t = useTranslations(`errors.${name}`)
  const body = error?.message ? String(t(error.message)) : props.children

  if (!body) {
    return null
  }

  return (
    <Field.Description
      data-slot="form-message"
      data-error={Boolean(error)}
      id={formMessageId}
      className={form().error({ className })}
      {...props}
    >
      {body}
    </Field.Description>
  )
}
