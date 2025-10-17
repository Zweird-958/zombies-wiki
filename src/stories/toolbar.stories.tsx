import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bold, Image, Italic, Link, Underline } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar"

const meta = {
  title: "Components/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup>
        <ToolbarButton render={<Toggle />}>
          <Bold />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />}>
          <Italic />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />}>
          <Underline />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  ),
}

export const Separator: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup>
        <ToolbarButton render={<Toggle />}>
          <Bold />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />}>
          <Italic />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />}>
          <Underline />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton render={<Toggle />}>
          <Image />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />}>
          <Link />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton>Save</ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  ),
}
