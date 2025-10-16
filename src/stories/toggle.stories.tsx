import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bold } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["default", "sm", "lg"] },
    variant: { control: "select", options: ["default", "outline"] },
  },

  args: {
    size: "default",
    variant: "default",
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Bold />,
  },
}

export const Disabled: Story = {
  args: {
    children: <Bold />,
    disabled: true,
  },
}
