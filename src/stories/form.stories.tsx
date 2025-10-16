import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

import { MAXIMUM_FILE_SIZE } from "@/api/utils/constants"
import { BaseForm } from "@/stories/components/form"

const Empty = () => <></>

const meta = {
  title: "Components/Form",
  component: Empty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

const DefaultForm = ({
  description,
}: Pick<ComponentProps<typeof BaseForm>, "description">) => {
  const form = useForm({
    defaultValues: { name: "" },
    resolver: zodResolver(
      z.object({ name: z.string().min(1, "Name is required") }),
    ),
  })

  return <BaseForm form={form} description={description} />
}

const ImageForm = () => {
  const form = useForm({
    defaultValues: {},
    resolver: zodResolver(
      z.object({
        image: z
          .file("Image is required")
          .max(MAXIMUM_FILE_SIZE, "File size must be less than 5MB")
          .mime(["image/png", "image/jpeg"], "Invalid file type"),
      }),
    ),
  })

  return <BaseForm form={form} type="image" />
}

export const Default: Story = {
  render: (args) => <DefaultForm {...args} />,
}

export const Description: Story = {
  render: (args) => <DefaultForm {...args} />,
  args: {
    description: "Please enter your full name.",
  },
}

export const Image: Story = {
  render: (args) => <ImageForm {...args} />,
}
