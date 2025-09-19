import { Bold, Underline } from "lucide-react"

import { useEditor } from "@/components/guides/editor/use-editor"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

type Props = {
  option: "bold" | "underline"
}

const OptionButton = ({ option }: Props) => {
  const { editor, editorState } = useEditor()
  const Icon = option === "bold" ? Bold : Underline

  const onClick = () => {
    if (option === "bold") {
      editor.chain().focus().toggleBold().run()

      return
    }

    editor.chain().focus().toggleUnderline().run()
  }

  return (
    <Button
      type="button"
      className="bg-transparent"
      size="icon"
      onClick={onClick}
    >
      <Icon
        className={cn("hover:text-primary", {
          "text-primary": editorState[option],
          "text-muted-foreground": !editorState[option],
        })}
      />
    </Button>
  )
}

export default OptionButton
