import OptionButton from "@/components/guides/editor/option-button"
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar"

const EditorToolbar = () => (
  <Toolbar>
    <ToolbarGroup className="gap-1.5">
      <ToolbarButton render={<OptionButton option="bold" />} />
      <ToolbarButton render={<OptionButton option="underline" />} />
    </ToolbarGroup>
  </Toolbar>
)

export default EditorToolbar
