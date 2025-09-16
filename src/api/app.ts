import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"

import gamesApp from "@/api/routes/games"
import { contextVariables, fail, send } from "@/api/utils/context"

const app = new Hono().basePath("/api")

app.use(cors(), (ctx, next) => {
  Object.entries(contextVariables).forEach(([name, value]) => {
    ctx.set(name as never, value as never)
  })
  ctx.set("send", send(ctx))
  ctx.set("fail", fail(ctx))

  return next()
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/", gamesApp)

app.onError((error, { var: { fail: ctxFail } }) => {
  // eslint-disable-next-line no-console
  console.error(error)

  return ctxFail("SOMETHING_WENT_WRONG")
})

export type AppType = typeof routes

export default handle(app)
