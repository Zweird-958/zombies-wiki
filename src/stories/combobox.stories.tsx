import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ComponentProps } from "react"

import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
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
    <ComboboxTrigger className="min-w-72">
      <ComboboxValue>
        {(value: Item | null) => (value ? value.label : "Select a fruit")}
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
      <ComboboxTrigger className="min-w-72">
        <ComboboxValue>
          {(value: Item | null) => (value ? value.label : "Select a food")}
        </ComboboxValue>
      </ComboboxTrigger>
      <ComboboxPopup>
        <ComboboxInput placeholder="Select a food..." />
        <ComboboxSeparator />
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

export const Disabled: Story = {
  render: DefaultCombobox,

  args: {
    items: fruits,
    defaultValue: fruits[0],
    disabled: true,
  },
}
