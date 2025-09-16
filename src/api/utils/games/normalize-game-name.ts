const normalizeGameName = (name: string) =>
  name.toLowerCase().replace(/\s+/gu, "-").replaceAll(":", "").toLowerCase()

export default normalizeGameName
