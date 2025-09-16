import type { ErrorCode } from "@/types/api"

export class ApiClientError extends Error {
  public status: number
  public code: ErrorCode

  constructor(message: string, status: number, code: ErrorCode) {
    super(message)

    this.status = status
    this.code = code
  }
}
