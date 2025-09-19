import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion"

type Props = {
  id: string
  name: string
  content: string
}

const StepAccordionItem = ({ id, name, content }: Props) => (
  <AccordionItem value={id}>
    <AccordionHeader>
      <AccordionTrigger>{name}</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      <div className="p-2" dangerouslySetInnerHTML={{ __html: content }} />
    </AccordionPanel>
  </AccordionItem>
)

export default StepAccordionItem
