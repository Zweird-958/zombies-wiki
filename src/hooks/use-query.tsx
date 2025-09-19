import {
  type UseQueryOptions,
  useQuery as useGenericQuery,
} from "@tanstack/react-query"
import { type InferResponseType } from "hono/client"

import { ApiClientError } from "@/api/errors"
import type {
  ApiError,
  HonoClientFunction,
  ResponseFiltered,
} from "@/types/api"

type QueryOptions<T extends HonoClientFunction> = Omit<
  UseQueryOptions<InferResponseType<T>, ApiClientError>,
  "queryFn"
>

export const useQuery = <T extends HonoClientFunction>(
  request: T,
  options: QueryOptions<T>,
) =>
  useGenericQuery<ResponseFiltered<T>, ApiClientError>({
    queryFn: async (variables) => {
      const response = await request(variables)

      if (response.ok) {
        return response.json() as Promise<ResponseFiltered<T>>
      }

      const error = (await response.json()) as ApiError

      throw new ApiClientError(
        error.message ?? error.error,
        response.status,
        error.code,
      )
    },
    ...options,
  })
