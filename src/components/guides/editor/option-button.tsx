import { Bold, Underline } from "lucide-react"

import { useEditor } from "@/components/guides/editor/use-editor"
import { Toggle } from "@/components/ui/toggle"
import type { MarkType } from "@/types/steps"

type Props = {
  option: Exclude<MarkType, "image">
}

const icons: Record<Exclude<MarkType, "image">, React.ElementType> = {
  bold: Bold,
  underline: Underline,
}

const OptionButton = ({ option }: Props) => {
  const { editor } = useEditor()
  const Icon = icons[option]

  const onClick = () => {
    if (option === "bold") {
      editor.chain().focus().toggleBold().run()

      return
    }

    editor.chain().focus().toggleUnderline().run()
  }

  return (
    <Toggle onClick={onClick} pressed={editor.isActive(option)}>
      <Icon />
    </Toggle>
  )
}

export default OptionButton
