import CreatGuideForm from "@/components/forms/create-guide-builder-form"
import { EditorProvider } from "@/components/guides/editor/use-editor"

const CreatGuidePage = () => (
  <EditorProvider>
    <CreatGuideForm />
  </EditorProvider>
)

export default CreatGuidePage
