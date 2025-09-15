import { faker } from "@faker-js/faker"
import type { APIError } from "better-auth"
import { describe, expect, it } from "vitest"

import { auth } from "@/utils/auth/auth"

const generateUserData = (email?: string) => ({
  email: email ?? faker.internet.email().toLocaleLowerCase(),
  password: faker.internet.password(),
  name: faker.person.fullName(),
})

describe("Sign up", () => {
  it("should successfully sign up a new user with valid credentials", async () => {
    const userData = generateUserData()

    const result = await auth.api.signUpEmail({
      body: userData,
    })

    expect(result).toHaveProperty("user")
    expect(result.user.email).toBe(userData.email)
    expect(result).toHaveProperty("token")
  })

  it("should throw an error when signing up with an existing email", async () => {
    const userData = generateUserData()

    await auth.api.signUpEmail({
      body: userData,
    })

    try {
      await auth.api.signUpEmail({
        body: userData,
      })
    } catch (error) {
      const apiError = error as APIError

      expect(apiError).toBeDefined()
      expect(apiError.body?.code).toBe("USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL")
    }
  })

  it("should throw an error when email is invalid", async () => {
    const userData = generateUserData("invalid-email")

    try {
      await auth.api.signUpEmail({
        body: userData,
      })
    } catch (error) {
      const apiError = error as APIError

      expect(apiError).toBeDefined()
      expect(apiError.body?.code).toBe("INVALID_EMAIL")
    }
  })
})
