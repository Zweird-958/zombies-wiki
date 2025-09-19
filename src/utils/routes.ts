export const routes = {
  home: "/",
  signIn: "/sign-in",
  game: (gameName: string) => `/${gameName}`,
  guide: (gameName: string, guideId: string) => `/${gameName}/${guideId}`,
  admin: {
    createGame: "/create-game",
    createGuide: (map?: string) => `/create-guide${map ? `?map=${map}` : ""}`,
    createMap: (game?: string) => `/create-map${game ? `?game=${game}` : ""}`,
  },
}
