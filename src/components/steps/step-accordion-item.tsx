import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion"
import type { StepParagraph } from "@/types/steps"
import { renderStep } from "@/utils/render-step"

type Props = {
  id: string
  name: string
  content: StepParagraph[]
  children?: React.ReactNode
}

const StepAccordionItem = ({ id, name, content, children }: Props) => (
  <AccordionItem value={id}>
    <AccordionHeader className="flex items-center">
      <AccordionTrigger>{name}</AccordionTrigger>
      {children}
    </AccordionHeader>
    <AccordionPanel>{renderStep(content, id)}</AccordionPanel>
  </AccordionItem>
)

export default StepAccordionItem
