import { Bold, Underline } from "lucide-react"

import { useEditor } from "@/components/guides/editor/use-editor"
import { Toggle } from "@/components/ui/toggle"

type Props = {
  option: "bold" | "underline"
}

const OptionButton = ({ option }: Props) => {
  const { editor } = useEditor()
  const Icon = option === "bold" ? Bold : Underline

  const onClick = () => {
    if (option === "bold") {
      editor.chain().focus().toggleBold().run()

      return
    }

    editor.chain().focus().toggleUnderline().run()
  }

  return (
    <Toggle onClick={onClick}>
      <Icon />
    </Toggle>
  )
}

export default OptionButton
