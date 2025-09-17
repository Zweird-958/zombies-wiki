export const routes = {
  home: "/",
  signIn: "/sign-in",
  game: (gameName: string) => `/games/${gameName}`,
  admin: {
    createGame: "/create-game",
  },
}
