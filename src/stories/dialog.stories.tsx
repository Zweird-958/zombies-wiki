import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPopup,
  type DialogProps,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    dismissible: true,
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

const DefaultDialog = (props: DialogProps) => (
  <Dialog {...props}>
    <DialogTrigger render={<Button />}>Open</DialogTrigger>

    <DialogPopup>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog Description</DialogDescription>
      <DialogContent>
        <p className="text-muted-foreground text-sm">
          This is an example of a dialog. Click outside the dialog or the close
          button to close it.
        </p>
      </DialogContent>
    </DialogPopup>
  </Dialog>
)

export const Default: Story = {
  render: DefaultDialog,
}

export const Dismissible: Story = {
  render: DefaultDialog,
  args: {
    dismissible: false,
  },
}
