import type { ERROR_RESPONSES } from "./utils/constants"

export class ApiClientError extends Error {
  public status: number
  public code: keyof typeof ERROR_RESPONSES

  constructor(
    message: string,
    status: number,
    code: keyof typeof ERROR_RESPONSES,
  ) {
    super(message)

    this.status = status
    this.code = code
  }
}
