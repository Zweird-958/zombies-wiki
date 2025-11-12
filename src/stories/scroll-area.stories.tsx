import { faker } from "@faker-js/faker"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {
    orientation: "vertical",
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <p>
          "Consequat proident quis proident. Ut nulla labore sunt ipsum duis non
          cupidatat. Ut aute id occaecat incididunt reprehenderit in
          reprehenderit. Dolor incididunt occaecat et pariatur. Quis eu
          consectetur adipisicing veniam Lorem.",
        </p>
        <p>
          Eu Lorem incididunt tempor culpa ex esse ut occaecat enim elit labore
          id ad labore ea. In pariatur proident enim. Incididunt ipsum do labore
          deserunt nostrud sint culpa et occaecat. Ullamco ut officia culpa
          cillum officia nisi elit in commodo et minim quis elit duis. Fugiat
          sunt aute ad ad sint nostrud. Laboris tempor sunt pariatur esse
          laboris in ullamco sunt.
        </p>
        <p>
          Culpa voluptate laboris in proident quis adipisicing adipisicing velit
          enim aliquip Lorem id sint elit. Eu non excepteur excepteur anim
          occaecat ipsum officia exercitation est consectetur aliqua. Duis id
          elit nisi irure amet non consectetur. Amet dolore anim amet pariatur
          mollit amet anim officia nulla quis enim dolor aliqua velit. Magna
          officia aliquip ex.
        </p>
      </>
    ),
  },
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    children: (
      <>
        {new Array(6).fill(null).map((_) => (
          <div className="relative flex size-[200px] items-center justify-center rounded-md p-4">
            <Image
              src={faker.image.url({ width: 200, height: 200 })}
              alt="Random"
              fill
              className="rounded-md"
            />
          </div>
        ))}
      </>
    ),
  },
}
