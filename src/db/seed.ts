/* eslint-disable no-console */
import { faker } from "@faker-js/faker"

import db from "@/db"
import { auth } from "@/utils/auth/auth"

const EMAIL = "test@example.com"
const PASSWORD = "password123"

const seed = async () => {
  console.log("Seeding database...")

  await auth.api.signUpEmail({
    body: { email: EMAIL, password: PASSWORD, name: faker.person.firstName() },
  })

  await db.$client.end()
}

void seed()
