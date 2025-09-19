import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion"

type Props = {
  name: string
  content: string
}

const StepAccordion = ({ name, content }: Props) => (
  <Accordion>
    <AccordionItem>
      <AccordionHeader>
        <AccordionTrigger>{name}</AccordionTrigger>
      </AccordionHeader>
      <AccordionPanel>
        <div className="p-2" dangerouslySetInnerHTML={{ __html: content }} />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
)

export default StepAccordion
