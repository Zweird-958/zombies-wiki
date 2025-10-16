import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import {
  NumberField,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/ui/number-field"

const meta = {
  title: "Components/NumberField",
  component: NumberFieldInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},

  args: {
    placeholder: "Enter a number",
  },
} satisfies Meta<typeof NumberFieldInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <NumberField>
      <Label>Number</Label>
      <NumberFieldInput {...args} />
    </NumberField>
  ),
  args: {},
}

export const HideActions: Story = {
  render: (args) => (
    <NumberField>
      <Label>Number</Label>
      <NumberFieldInput {...args} />
    </NumberField>
  ),
  args: {
    hideActions: true,
  },
}

export const ScrubArea: Story = {
  render: (args) => (
    <NumberField>
      <NumberFieldScrubArea>
        <Label>Number</Label>
      </NumberFieldScrubArea>
      <NumberFieldInput {...args} />
    </NumberField>
  ),
}
