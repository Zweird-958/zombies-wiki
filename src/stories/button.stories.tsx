import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { User } from "lucide-react"
import { fn } from "storybook/test"

import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning"],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    variant: { control: "select", options: ["outline", "solid"] },
    radius: { control: "select", options: ["sm", "md", "lg", "none", "full"] },
    shadow: { control: "select", options: ["none", "sm", "md", "lg"] },
    isPending: { control: "boolean" },
  },

  args: {
    isPending: false,
    size: "md",
    color: "primary",
    variant: "solid",
    radius: "md",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Icon: Story = {
  args: {
    children: (
      <>
        <User />
        Button
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    children: <User />,
    size: "icon",
  },
}

export const Pending: Story = {
  args: {
    children: "Button",
    isPending: true,
  },
}

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
}
