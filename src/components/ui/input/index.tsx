import { Input as BaseInput } from "@base-ui-components/react/input"
import * as React from "react"

export type InputProps = React.ComponentProps<typeof BaseInput>

export const Input = (props: InputProps) => <BaseInput {...props} />
