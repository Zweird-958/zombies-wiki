import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion"

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Accordion</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Item 1</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content for Item 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Item 2</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content for Item 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger>Item 3</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content for Item 3</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),

  args: {
    openMultiple: true,
  },
}

export const DefaultExpanded: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionHeader>
          <AccordionTrigger>Item 1</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content for Item 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionHeader>
          <AccordionTrigger>Item 2</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content for Item 2</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionHeader>
          <AccordionTrigger>Item 3</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>Content for Item 3</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),

  args: {
    defaultValue: ["item-2"],
  },
  argTypes: {
    defaultValue: {
      control: "check",
      options: ["item-1", "item-2", "item-3"],
    },
  },
}
