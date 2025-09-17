import type { AuthErrorCode, ErrorCode } from "@/types/api"

export class ApiClientError extends Error {
  public status: number
  public code: ErrorCode | AuthErrorCode

  constructor(
    message: string,
    status: number,
    code: ErrorCode | AuthErrorCode,
  ) {
    super(message)

    this.status = status
    this.code = code
  }
}
