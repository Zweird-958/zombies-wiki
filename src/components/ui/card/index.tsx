import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"
import * as React from "react"

import { card } from "@/components/ui/card/variants"
import { cn } from "@/utils/cn"

const styles = card()

export type CardProps = useRender.ComponentProps<"div">

export const Card = ({ render, className, ...props }: CardProps) => {
  const element = useRender({
    defaultTagName: "div",
    render,
    state: {
      slot: "card",
    },
    stateAttributesMapping: {
      slot: (state) => ({ "data-slot": state }),
    },
    props: mergeProps<"div">(
      { className: cn(styles.base(), className) },
      props,
    ),
  })

  return element
}

export type CardHeaderProps = React.ComponentProps<"div">

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={cn(styles.header(), className)}
    {...props}
  />
)

export type CardTitleProps = React.ComponentProps<"div">

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div
    data-slot="card-title"
    className={cn(styles.title(), className)}
    {...props}
  />
)

export type CardDescriptionProps = React.ComponentProps<"div">

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <div
    data-slot="card-description"
    className={cn(styles.description(), className)}
    {...props}
  />
)

export type CardActionProps = React.ComponentProps<"div">

export const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    data-slot="card-action"
    className={cn(styles.action(), className)}
    {...props}
  />
)

export type CardContentProps = React.ComponentProps<"div">

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    data-slot="card-content"
    className={cn(styles.content(), className)}
    {...props}
  />
)

export type CardFooterProps = React.ComponentProps<"div">

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={cn(styles.footer(), className)}
    {...props}
  />
)
