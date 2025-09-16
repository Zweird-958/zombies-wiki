import * as React from "react"

import { card } from "@/components/ui/card/variants"

export type CardProps = React.ComponentProps<"div">

export const Card = ({ className, ...props }: CardProps) => (
  <div data-slot="card" className={card().base({ className })} {...props} />
)

export type CardHeaderProps = React.ComponentProps<"div">

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    data-slot="card-header"
    className={card().header({ className })}
    {...props}
  />
)

export type CardTitleProps = React.ComponentProps<"div">

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div
    data-slot="card-title"
    className={card().title({ className })}
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
    className={card().description({ className })}
    {...props}
  />
)

export type CardActionProps = React.ComponentProps<"div">

export const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    data-slot="card-action"
    className={card().action({ className })}
    {...props}
  />
)

export type CardContentProps = React.ComponentProps<"div">

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    data-slot="card-content"
    className={card().content({ className })}
    {...props}
  />
)

export type CardFooterProps = React.ComponentProps<"div">

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    data-slot="card-footer"
    className={card().footer({ className })}
    {...props}
  />
)
