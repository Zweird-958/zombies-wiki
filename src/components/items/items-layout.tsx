import type { ReactNode } from "react"

type Props = {
  name?: string
  children: ReactNode
}

const ItemsLayout = ({ name, children }: Props) => (
  <div className="mx-auto w-full max-w-6xl px-8">
    {name && <h1 className="pb-8 text-center text-xl font-semibold">{name}</h1>}
    <div className="flex w-full flex-wrap justify-center gap-8">{children}</div>
  </div>
)

export default ItemsLayout
