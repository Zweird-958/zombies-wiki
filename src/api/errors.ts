export class ApiClientError extends Error {
  public status: number
  public code: string

  constructor(message: string, status: number, code: string) {
    super(message)

    this.status = status
    this.code = code
  }
}
