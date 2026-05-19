import ImageOptionButton from "@/components/guides/editor/image-option-dialog"
import OptionButton from "@/components/guides/editor/option-button"
import { useEditor } from "@/components/guides/editor/use-editor"
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar"

const EditorToolbar = () => {
  const { editorState } = useEditor()

  return (
    <Toolbar>
      <ToolbarGroup className="gap-1.5">
        <ToolbarButton
          render={<OptionButton option="bold" disabled={editorState.image} />}
        />
        <ToolbarButton
          render={
            <OptionButton option="underline" disabled={editorState.image} />
          }
        />
        <ToolbarButton render={<ImageOptionButton />} />
      </ToolbarGroup>
    </Toolbar>
  )
}

export default EditorToolbar
