import { faker } from "@faker-js/faker"
import type { APIError } from "better-auth"
import { beforeAll, describe, expect, it } from "vitest"

import { auth } from "@/utils/auth/auth"

const userData = {
  email: faker.internet.email().toLocaleLowerCase(),
  password: faker.internet.password(),
  name: faker.person.fullName(),
}

beforeAll(async () => {
  await auth.api.signUpEmail({ body: userData })
})

describe("Sign up", () => {
  it("should successfully sign in with valid credentials", async () => {
    const result = await auth.api.signInEmail({
      body: userData,
    })

    expect(result).toHaveProperty("user")
    expect(result.user.email).toBe(userData.email)
    expect(result).toHaveProperty("token")
  })

  it("should throw an error when signing in with invalid credentials", async () => {
    try {
      await auth.api.signInEmail({
        body: {
          email: userData.email,
          password: "wrong-password",
        },
      })
    } catch (error) {
      const apiError = error as APIError

      expect(apiError).toBeDefined()
      expect(apiError.body?.code).toBe("INVALID_EMAIL_OR_PASSWORD")
    }
  })
})
