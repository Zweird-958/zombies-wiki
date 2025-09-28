import { Mark, mergeAttributes } from "@tiptap/react"

type ImageAttributes = {
  imageUrl?: string
}

declare module "@tiptap/react" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Commands<ReturnType> {
    image: {
      setImage: (attributes: ImageAttributes) => ReturnType
      toggleImage: (attributes: ImageAttributes) => ReturnType
      unsetImage: () => ReturnType
    }
  }
}

export const ImageMark = Mark.create({
  name: "image",

  addAttributes() {
    return {
      imageUrl: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-image-url"),
        renderHTML: (attributes: ImageAttributes) => {
          if (!attributes.imageUrl) {
            return {}
          }

          return {
            "data-image-url": attributes.imageUrl,
          }
        },
      },
    }
  },

  parseHTML() {
    return [{ tag: "span[data-image-url]" }]
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: ImageAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-slot": "image" }),
      0,
    ]
  },

  addCommands() {
    return {
      setImage:
        (attributes) =>
        ({ commands }) =>
          commands.setMark(this.name, attributes),
      toggleImage:
        (attributes) =>
        ({ commands }) =>
          commands.toggleMark(this.name, attributes),
      unsetImage:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    }
  },
})
