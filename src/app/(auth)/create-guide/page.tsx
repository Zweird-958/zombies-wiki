import CreateGuideBuilderForm from "@/components/forms/create-guide-builder-form"
import { EditorProvider } from "@/components/guides/editor/use-editor"

const CreateGuidePage = () => (
  <EditorProvider>
    <CreateGuideBuilderForm />
  </EditorProvider>
)

export default CreateGuidePage
