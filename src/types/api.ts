import type {
  ClientRequestOptions,
  ClientResponse,
  InferResponseType,
} from "hono/client"

import type { ERROR_RESPONSES } from "@/api/utils/constants"
import type { authClient } from "@/utils/auth/auth-client"

export type ErrorCode = keyof typeof ERROR_RESPONSES
export type AuthErrorCode = keyof typeof authClient.$ERROR_CODES

export type ApiError = {
  error: string
  message?: string
  code: ErrorCode
}

export type HonoClientFunction =
  | ((
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: any,
      options?: ClientRequestOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ClientResponse<any, number, "json">>)
  | ((
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      args?: {},
      options?: ClientRequestOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ClientResponse<any, number, "json">>)

export type ResponseFiltered<T extends HonoClientFunction> = Exclude<
  InferResponseType<T>,
  { error: unknown }
>
