import type { StatusCode } from "hono/utils/http-status"

export const ERROR_RESPONSES = {
  SOMETHING_WENT_WRONG: { code: 500, message: "Something went wrong" },
} satisfies Record<string, { code: StatusCode; message: string }>
