export const normalizeGameName = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/gu, "-")
    .replaceAll(":", "")
    .toLowerCase()
