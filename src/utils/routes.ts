export const routes = {
  home: "/",
  signIn: "/sign-in",
  game: (gameName: string) => `/${gameName}`,
  map: (gameName: string, mapName: string) => `/${gameName}/${mapName}`,
  guide: (gameName: string, guideId: string) => `/${gameName}/${guideId}`,
  admin: {
    createGame: "/create-game",
    createGuide: (map?: string) => `/create-guide${map ? `?map=${map}` : ""}`,
    createMap: (game?: string) => `/create-map${game ? `?game=${game}` : ""}`,
  },
}
