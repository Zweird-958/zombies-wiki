import { NumberField as BaseNumberField } from "@base-ui-components/react/number-field"
import { Minus, MoveHorizontal, MoveVertical, Plus } from "lucide-react"

import { numberField } from "@/components/ui/number-field/variants"
import { cn } from "@/utils/cn"

const styles = numberField()

export type NumberFieldProps = BaseNumberField.Root.Props

export const NumberField = ({ className, ...props }: NumberFieldProps) => (
  <BaseNumberField.Root
    className={cn(styles.base(), className)}
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
        className={cn(styles.input({ isGroup: false }), className)}
        data-slot="number-field-input"
        {...props}
      />
    )
  }

  return (
    <BaseNumberField.Group
      className={styles.group()}
      data-slot="number-field-group"
    >
      <BaseNumberField.Decrement data-slot="number-field-decrement">
        <Minus />
      </BaseNumberField.Decrement>
      <BaseNumberField.Input
        className={cn(styles.input({ isGroup: true }), className)}
        data-slot="number-field-input"
        {...props}
      />
      <BaseNumberField.Increment data-slot="number-field-increment">
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
    className={cn(styles.scrubArea(), className)}
    direction={direction}
    data-slot="number-field-scrub-area"
    {...props}
  >
    {children}
    <BaseNumberField.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      className={styles.scrubAreaCursor()}
    >
      {direction === "horizontal" ? <MoveHorizontal /> : <MoveVertical />}
    </BaseNumberField.ScrubAreaCursor>
  </BaseNumberField.ScrubArea>
)
