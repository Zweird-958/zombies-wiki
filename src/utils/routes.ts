export const routes = {
  home: "/",
  signIn: "/sign-in",
  game: (gameName: string) => `/${gameName}`,
  guide: (gameName: string, guideId: string) => `/${gameName}/${guideId}`,
  admin: {
    createGame: "/create-game",
    createGuide: (game?: string) =>
      `/create-guide${game ? `?game=${game}` : ""}`,
    createMap: (game?: string) => `/create-map${game ? `?game=${game}` : ""}`,
  },
}
