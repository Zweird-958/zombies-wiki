import type { StatusCode } from "hono/utils/http-status"

export const ERROR_RESPONSES = {
  SOMETHING_WENT_WRONG: { code: 500, message: "Something went wrong" },
  CONFLICT: { code: 409, message: "Conflict" },
} satisfies Record<string, { code: StatusCode; message: string }>

// 5MB
export const MAXIMUM_FILE_SIZE = 5_000_000
