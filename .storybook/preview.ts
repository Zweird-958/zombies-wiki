import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/nextjs-vite"

import "@/app/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      backgrounds: { disable: true },
      matchers: {
        color: /(background|color)$/iu,
        date: /Date$/iu,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export const decorators = [
  withThemeByClassName({
    themes: { light: "light bg-default", dark: "dark bg-default" },
    defaultTheme: "light",
  }),
]

export default preview
