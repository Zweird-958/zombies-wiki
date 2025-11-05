/* eslint-disable max-lines */
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { type ComponentProps, useRef } from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  type ComboboxProps,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

type Item = { label: string; value: string }
type GroupItems = Item & { items: Item[] }

const fruits: Item[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Mango", value: "mango" },
]

const foodGroups: GroupItems[] = [
  {
    label: "Fruits",
    value: "fruits",
    items: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ],
  },
  {
    label: "Vegetables",
    value: "vegetables",
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Broccoli", value: "broccoli" },
      { label: "Spinach", value: "spinach" },
    ],
  },
]

const DefaultCombobox = (props: ComponentProps<typeof Combobox>) => (
  <Combobox {...props}>
    <ComboboxInput placeholder="Select a fruit..." />
    <ComboboxPopup>
      <ComboboxEmpty>No fruits found.</ComboboxEmpty>
      <ComboboxList>
        {(item: Item) => (
          <ComboboxItem key={item.value} value={item}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
)

export const Default: Story = {
  render: DefaultCombobox,

  args: {
    items: fruits,
    defaultValue: null,
  },
}

export const Group: Story = {
  render: (args) => (
    <Combobox {...args}>
      <ComboboxInput placeholder="Select a food..." />
      <ComboboxPopup>
        <ComboboxEmpty>No food found.</ComboboxEmpty>
        <ComboboxList>
          {(item: GroupItems) => (
            <ComboboxGroup key={item.value} items={item.items}>
              <ComboboxGroupLabel>{item.label}</ComboboxGroupLabel>
              {item.items.map((food) => (
                <ComboboxItem key={food.value} value={food}>
                  {food.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  ),

  args: {
    items: foodGroups,
    defaultValue: null,
  },
}

export const InputInside: Story = {
  render: (args) => (
    <Combobox {...args}>
      <ComboboxTrigger>
        <ComboboxValue>
          {(value: Item | null) => (value ? value.label : "Select a fruit ")}
        </ComboboxValue>
      </ComboboxTrigger>
      <ComboboxPopup>
        <ComboboxInput placeholder="Select a fruit..." />
        <ComboboxSeparator />
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  ),

  args: {
    items: fruits,
    defaultValue: null,
    inputPlacement: "inside",
  },
}

const MulitpleCombobox = <
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
>({
  items,
}: ComboboxProps<ItemValue, SelectedValue, Multiple>) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <Combobox items={items} multiple>
      <ComboboxChips ref={containerRef}>
        <ComboboxValue>
          {(value: Item[]) => (
            <>
              {value.map((fruit) => (
                <ComboboxChip key={fruit.value} aria-label={fruit.value}>
                  {fruit.label}
                </ComboboxChip>
              ))}
              <ComboboxInput
                placeholder={value.length > 0 ? "" : "e.g. Apple"}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxPopup anchor={containerRef}>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}

export const Multiple: Story = {
  render: (args) => <MulitpleCombobox {...args} />,

  args: {
    items: fruits,
  },
}

const MulitpleInsideCombobox = <
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
>({
  items,
}: ComboboxProps<ItemValue, SelectedValue, Multiple>) => {
  const containerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <Combobox inputPlacement="inside" items={items} multiple>
      <ComboboxTrigger ref={containerRef}>
        <ComboboxChips>
          <ComboboxValue>
            {(value: Item[]) =>
              value.length === 0 ? (
                "Select a fruit"
              ) : (
                <>
                  {value.map((fruit) => (
                    <ComboboxChip key={fruit.value} aria-label={fruit.value}>
                      {fruit.label}
                    </ComboboxChip>
                  ))}
                </>
              )
            }
          </ComboboxValue>
        </ComboboxChips>
      </ComboboxTrigger>

      <ComboboxPopup anchor={containerRef}>
        <ComboboxInput placeholder="Select a fruit..." />
        <ComboboxSeparator />
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}

export const MultipleInputInside: Story = {
  render: (args) => <MulitpleInsideCombobox {...args} />,

  args: {
    items: fruits,
  },
}

export const Disabled: Story = {
  render: DefaultCombobox,

  args: {
    items: fruits,
    defaultValue: fruits[0],
    disabled: true,
  },
}
