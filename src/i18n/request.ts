import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

import { config } from "@/configs/locale"

const getCookieLocale = async () => {
  const cookieList = await cookies()

  return cookieList.get("locale")?.value
}

const getNavigatorLocale = () =>
  typeof navigator !== "undefined" && navigator.language

const calcLocale = (locale: string) => {
  if (hasLocale(config.locales, locale)) {
    return locale
  }

  try {
    const parsedLocale = new Intl.Locale(locale)

    if (hasLocale(config.locales, parsedLocale.language)) {
      return parsedLocale.language
    }

    return config.defaultLocale
  } catch {
    return config.defaultLocale
  }
}

const getLocale = async () => {
  const cookieLocale = await getCookieLocale()

  if (cookieLocale) {
    return calcLocale(cookieLocale)
  }

  const navigatorLocale = getNavigatorLocale()

  if (navigatorLocale) {
    return calcLocale(navigatorLocale)
  }

  return config.defaultLocale
}

export default getRequestConfig(async () => {
  const locale = await getLocale()

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
