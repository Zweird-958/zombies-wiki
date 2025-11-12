import { describe, expect, it } from "vitest"

import { slugify } from "@/api/utils/slugify"

describe("slugify", () => {
  it("should normalize game names correctly", () => {
    const testCases = [
      { input: "Call of Duty: Black Ops", expected: "call-of-duty-black-ops" },
      {
        input: "Call of Duty: Black Ops 2",
        expected: "call-of-duty-black-ops-2",
      },
      {
        input: "Call of Duty: Modern Warfare",
        expected: "call-of-duty-modern-warfare",
      },
      { input: "Call of Duty: MW2", expected: "call-of-duty-mw2" },
      { input: "Call of Duty: MW3", expected: "call-of-duty-mw3" },
      { input: "Call of Duty: WWII", expected: "call-of-duty-wwii" },
      { input: "Call of Duty: Vanguard", expected: "call-of-duty-vanguard" },
      { input: "Call of Duty: Warzone", expected: "call-of-duty-warzone" },
      {
        input: "Call of Duty 4: Modern Warfare",
        expected: "call-of-duty-4-modern-warfare",
      },
    ]

    testCases.forEach(({ input, expected }) => {
      const slug = slugify(input)

      expect(slug).toBe(expected)
    })
  })

  it("should handle edge cases", () => {
    const testCases = [
      {
        input: "  Call of Duty: Black Ops  ",
        expected: "call-of-duty-black-ops",
      },
      { input: "CALL OF DUTY: BLACK OPS", expected: "call-of-duty-black-ops" },
      {
        input: "Call   of   Duty:   Black   Ops",
        expected: "call-of-duty-black-ops",
      },
      { input: "Call-of-Duty-Black-Ops", expected: "call-of-duty-black-ops" },
    ]

    testCases.forEach(({ input, expected }) => {
      const slug = slugify(input)

      expect(slug).toBe(expected)
    })
  })
})
