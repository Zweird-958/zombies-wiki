"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { ApiClientError } from "@/api/errors"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormFieldInput, FormWrapper } from "@/components/ui/form"
import { useError } from "@/hooks/use-error"
import { SignInSchema } from "@/schemas/users"
import type { AuthErrorCode } from "@/types/api"
import type { SignIn } from "@/types/users"
import { authClient } from "@/utils/auth/auth-client"
import { routes } from "@/utils/routes"

const SignInForm = () => {
  const t = useTranslations("forms.signIn")
  const { onError } = useError("signIn")
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  })

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async (values: SignIn) => {
      const { data, error } = await authClient.signIn.email(values)

      if (error) {
        const { code = "", message = "", status } = error

        throw new ApiClientError(message, status, code as AuthErrorCode)
      }

      return data
    },
    onError,
    onSuccess: () => {
      router.push(routes.home)
    },
  })

  const onSubmit = (data: SignIn) => {
    signIn(data)
  }

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <FormFieldInput
              name="email"
              type="email"
              label={t("email.label")}
              placeholder={t("email.placeholder")}
            />
            <FormFieldInput
              name="password"
              type="password"
              label={t("password.label")}
              placeholder={t("password.placeholder")}
            />
            <Button type="submit" className="w-full" isPending={isPending}>
              {t("submit")}
            </Button>
          </FormWrapper>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInForm
