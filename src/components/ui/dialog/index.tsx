import { Dialog as BaseDialog } from "@base-ui-components/react/dialog"
import { X } from "lucide-react"
import type { ComponentProps } from "react"

import { cn } from "@/utils/cn"

export type DialogProps = BaseDialog.Root.Props

export const Dialog = BaseDialog.Root

export type DialogTriggerProps = BaseDialog.Trigger.Props

export const DialogTrigger = BaseDialog.Trigger

export type DialogCloseProps = BaseDialog.Close.Props

export const DialogClose = BaseDialog.Close

export type DialogPopupProps = { closeText?: string } & BaseDialog.Popup.Props

export const DialogPopup = ({
  className,
  children,
  closeText = "Close",
  ...props
}: DialogPopupProps) => (
  <BaseDialog.Portal>
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      className="starting-style:opacity-0 ending-style:opacity-0 fixed inset-0 bg-black opacity-70 transition-all duration-150"
    />
    <BaseDialog.Popup
      data-slot="dialog-popup"
      className={cn(
        "bg-popover text-popover-foreground starting-style:scale-90 starting-style:opacity-0 ending-style:scale-90 ending-style:opacity-0 border-border fixed top-1/2 left-1/2 z-50 max-w-[calc(100vw-3rem)] min-w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 transition-all duration-150",
        className,
      )}
      {...props}
    >
      {children}

      <BaseDialog.Close
        data-slot="dialog-close"
        className="svg-not-size:size-4 svg:pointer-events-none svg:shrink-0 absolute top-4 right-4 rounded-full opacity-70 outline-0 transition-opacity hover:opacity-100 disabled:pointer-events-none"
      >
        <X />
        <span className="sr-only">{closeText}</span>
      </BaseDialog.Close>
    </BaseDialog.Popup>
  </BaseDialog.Portal>
)

export type DialogContentProps = ComponentProps<"div">

export const DialogContent = ({ className, ...props }: DialogContentProps) => (
  <div
    data-slot="dialog-content"
    className={cn("pt-2", className)}
    {...props}
  />
)

export type DialogTitleProps = BaseDialog.Title.Props

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <BaseDialog.Title
    data-slot="dialog-title"
    className={cn("text-lg font-medium", className)}
    {...props}
  />
)

export type DialogDescriptionProps = BaseDialog.Description.Props

export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => (
  <BaseDialog.Description
    data-slot="dialog-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
)
