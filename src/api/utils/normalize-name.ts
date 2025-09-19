export const normalizeName = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/gu, "-")
    .replaceAll(":", "")
    .toLowerCase()
