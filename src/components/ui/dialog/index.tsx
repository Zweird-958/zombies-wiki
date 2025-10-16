import { Dialog as BaseDialog } from "@base-ui-components/react/dialog"
import { X } from "lucide-react"
import type { ComponentProps } from "react"

import { dialog } from "@/components/ui/dialog/variants"
import { cn } from "@/utils/cn"

const styles = dialog()

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
      className={styles.backdrop()}
    />
    <BaseDialog.Popup
      data-slot="dialog-popup"
      className={cn(styles.popup(), className)}
      {...props}
    >
      {children}

      <BaseDialog.Close data-slot="dialog-close" className={styles.close()}>
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
    className={cn(styles.content(), className)}
    {...props}
  />
)

export type DialogTitleProps = BaseDialog.Title.Props

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <BaseDialog.Title
    data-slot="dialog-title"
    className={cn(styles.title(), className)}
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
    className={cn(styles.description(), className)}
    {...props}
  />
)
