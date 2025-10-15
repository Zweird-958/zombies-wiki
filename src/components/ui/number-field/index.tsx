import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field"
import { Minus, MoveHorizontal, MoveVertical, Plus } from "lucide-react"

import { cn } from "@/utils/cn"

export type NumberFieldProps = BaseNumberField.Root.Props

export const NumberField = ({ className, ...props }: NumberFieldProps) => (
  <BaseNumberField.Root
    className={cn("flex flex-col gap-2", className)}
    data-slot="number-field"
    {...props}
  />
)

export type NumberFieldInputProps = {
  hideActions?: boolean
} & BaseNumberField.Input.Props

export const NumberFieldInput = ({
  className,
  hideActions,
  ...props
}: NumberFieldInputProps) => {
  if (hideActions) {
    return (
      <BaseNumberField.Input
        className={cn(
          "border-input rounded-md border px-2 py-1 focus:ring focus:outline-none",
          className,
        )}
        data-slot="number-field-input"
        {...props}
      />
    )
  }

  return (
    <BaseNumberField.Group className="button:border-input button:size-10 svg-not-size:size-4 button:border button:p-2 button:flex button:items-center button:justify-center button:text-accent-foreground button:bg-accent focused:button:ring flex">
      <BaseNumberField.Decrement className="rounded-l-md">
        <Minus />
      </BaseNumberField.Decrement>
      <BaseNumberField.Input
        className={cn(
          "border-input peer focused:ring flex-1 border-t border-b px-2 py-1 text-center tabular-nums focus:outline-none",
          className,
        )}
        data-slot="number-field-input"
        {...props}
      />
      <BaseNumberField.Increment className="rounded-r-md">
        <Plus />
      </BaseNumberField.Increment>
    </BaseNumberField.Group>
  )
}

export type NumberFieldScrubAreaProps = BaseNumberField.ScrubArea.Props

export const NumberFieldScrubArea = ({
  children,
  className,
  direction = "horizontal",
  ...props
}: NumberFieldScrubAreaProps) => (
  <BaseNumberField.ScrubArea
    className={cn("*:cursor-ew-resize", className)}
    direction={direction}
    data-slot="number-field-scrub-area"
    {...props}
  >
    {children}
    <BaseNumberField.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      className="text-input size-4"
    >
      {direction === "horizontal" ? <MoveHorizontal /> : <MoveVertical />}
    </BaseNumberField.ScrubAreaCursor>
  </BaseNumberField.ScrubArea>
)
