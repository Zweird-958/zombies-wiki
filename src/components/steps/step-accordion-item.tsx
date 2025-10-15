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
}

const StepAccordionItem = ({ id, name, content }: Props) => (
  <AccordionItem value={id}>
    <AccordionHeader>
      <AccordionTrigger>{name}</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>{renderStep(content, id)}</AccordionPanel>
  </AccordionItem>
)

export default StepAccordionItem
