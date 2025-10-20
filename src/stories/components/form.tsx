/* eslint-disable max-lines */
import { Field } from "@base-ui-components/react/field"
import { type ComponentProps, useState } from "react"
import { useDropzone } from "react-dropzone"
import type { FieldValues, UseFormReturn } from "react-hook-form"

import { MAXIMUM_FILE_SIZE } from "@/api/utils/constants"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormDescription,
  type FormErrorProps,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormWrapper,
} from "@/components/ui/form"
import { useFormField } from "@/components/ui/form/hooks"
import { FileDropzone, PreviewImage } from "@/components/ui/form/image"
import { NumberField } from "@/components/ui/number-field"
import { cn } from "@/utils/cn"

type InputImageControllerProps = {
  value: File | null
  onChange: (file: File | null) => void
} & Pick<ComponentProps<typeof FileDropzone>, "label" | "description">

const FormError = ({ className, ...props }: FormErrorProps) => {
  const { error, formMessageId } = useFormField()
  const body = error?.message ? String(error.message) : props.children

  return (
    <Field.Error
      data-slot="form-error"
      data-error={Boolean(error)}
      id={formMessageId}
      className={cn("text-danger text-sm", className)}
      match={Boolean(body)}
      {...props}
    >
      {body}
    </Field.Error>
  )
}

const InputImageController = ({
  onChange,
  value,
  label,
  description,
}: InputImageControllerProps) => {
  const { name } = useFormField()

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop: ([file]) => {
        onChange(file)
      },
      maxSize: MAXIMUM_FILE_SIZE,
      maxFiles: 1,
      multiple: false,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
      },
    })

  const handleRemove = () => onChange(null)

  const error = fileRejections.length > 0 && fileRejections[0].errors[0].code

  return (
    <>
      <div className="flex flex-col gap-4">
        <FileDropzone
          label={label}
          description={description}
          name={name}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
        {value && <PreviewImage handleRemove={handleRemove} value={value} />}
      </div>
      {error ? <FormError>{error}</FormError> : <FormError />}
    </>
  )
}

type Props<
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues = TFieldValues,
> = {
  description?: string
  type?: "text" | "image" | "number"
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
}

export const BaseForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  description,
  type = "text",
  form,
}: Props<TFieldValues, TContext, TTransformedValues>) => {
  const [isPending, setIsPending] = useState(false)

  const onSubmit = (data: unknown) => {
    // eslint-disable-next-line no-console
    console.log(data)

    setIsPending(true)

    setTimeout(() => {
      setIsPending(false)
      form.reset()
    }, 2000)
  }

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)} className="w-[300px]">
        {type === "text" && (
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormInput {...field} />
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
                <FormError />
              </FormItem>
            )}
          />
        )}
        {type === "image" && (
          <FormField
            name="image"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <InputImageController
                  label="Image"
                  description={description}
                  onChange={onChange}
                  value={value as File | null}
                />
              </FormItem>
            )}
          />
        )}
        {type === "number" && (
          <FormField
            name="quantity"
            render={({ field }) => (
              <FormItem render={<NumberField onValueChange={field.onChange} />}>
                <FormLabel>Quantity</FormLabel>
                <FormInput inputType="number" {...field} />
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
                <FormError />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" isPending={isPending}>
          Submit
        </Button>
      </FormWrapper>
    </Form>
  )
}
