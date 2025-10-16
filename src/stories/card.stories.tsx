import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import NextImage from "next/image"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
  args: {},
}

export const Image: Story = {
  render: (args) => (
    <Card
      className="group size-64 items-center justify-center overflow-hidden p-0"
      {...args}
    >
      <CardHeader className="absolute z-10 text-lg">
        <CardTitle>Name</CardTitle>
      </CardHeader>
      <CardContent className="relative size-full overflow-hidden p-0 blur-xs">
        <NextImage
          src={"./images/call-of-duty-black-ops-6.png"}
          alt="alt"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </CardContent>
    </Card>
  ),
}
