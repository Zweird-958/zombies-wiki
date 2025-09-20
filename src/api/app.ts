import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"

import { gamesApp } from "@/api/routes/games"
import { guidesApp } from "@/api/routes/guides"
import { mapsApp } from "@/api/routes/maps"
import { contextVariables, fail, send } from "@/api/utils/context"
import { auth } from "@/utils/auth/auth"

const app = new Hono().basePath("/api")

app.use(cors(), (ctx, next) => {
  Object.entries(contextVariables).forEach(([name, value]) => {
    ctx.set(name as never, value as never)
  })
  ctx.set("send", send(ctx))
  ctx.set("fail", fail(ctx))

  return next()
})

app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/", gamesApp)
  .route("/", guidesApp)
  .route("/", mapsApp)

app.onError((error, { var: { fail: ctxFail } }) => {
  // eslint-disable-next-line no-console
  console.error(error)

  return ctxFail("SOMETHING_WENT_WRONG")
})

export type AppType = typeof routes

export default handle(app)
