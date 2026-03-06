import CreatGuideForm from "@/components/forms/create-guide-builder-form"
import { EditorProvider } from "@/components/guides/editor/use-editor"
import { ImagesProvider } from "@/hooks/use-images"

const CreatGuidePage = () => (
  <EditorProvider>
    <ImagesProvider>
      <CreatGuideForm />
    </ImagesProvider>
  </EditorProvider>
)

export default CreatGuidePage
