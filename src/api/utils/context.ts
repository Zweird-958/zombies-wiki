import type { Context } from "hono"

import db from "@/db"
import type { ErrorCode } from "@/types/api"

import { ERROR_RESPONSES } from "./constants"

export const contextVariables = {
  db,
}

type ContextVariables = typeof contextVariables
type Meta = Record<string, unknown>

export const send =
  (ctx: Context) =>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  <TData, TMeta extends Meta = {}>(data: TData, meta: TMeta = {} as TMeta) =>
    ctx.json({
      result: data,
      meta,
    })

export const fail =
  (ctx: Context) => (errorName: ErrorCode, message?: string) => {
    const result = {
      error: ERROR_RESPONSES[errorName].message,
      code: errorName,
    }

    return ctx.json(
      message ? { ...result, message } : result,
      ERROR_RESPONSES[errorName].code,
    )
  }

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap extends ContextVariables {
    send: ReturnType<typeof send>
    fail: ReturnType<typeof fail>
  }
}
