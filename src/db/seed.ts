/* eslint-disable no-console */
import { faker } from "@faker-js/faker"

import { db } from "@/db"
import { auth } from "@/utils/auth/auth"

const seed = async () => {
  console.log("Seeding database...")

  await auth.api.createUser({
    body: {
      email: process.env.ADMIN_EMAIL!,
      password: process.env.ADMIN_PASSWORD!,
      name: faker.person.firstName(),
      role: "admin",
    },
  })

  await db.$client.end()
}

void seed()
