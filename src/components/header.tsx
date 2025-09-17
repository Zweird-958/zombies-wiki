import { getTranslations } from "next-intl/server"
import { headers } from "next/headers"
import Link from "next/link"

import { auth } from "@/utils/auth/auth"
import { routes } from "@/utils/routes"

const ROUTES = [{ label: "home", href: routes.home }]
const ADMIN_ROUTES = [
  ...ROUTES,
  { label: "createGame", href: routes.admin.createGame },
]

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const isAdmin = session?.user.role === "admin"
  const t = await getTranslations("header")

  return (
    <header className="border-border flex items-center justify-between border-b px-8 py-4">
      <h1>{t("title")}</h1>

      <nav className="flex gap-4">
        {(isAdmin ? ADMIN_ROUTES : ROUTES).map(({ label, href }) => (
          <Link key={href} href={href}>
            {t(label)}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
