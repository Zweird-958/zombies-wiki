import { client } from "@/api/client"
import GamesList from "@/components/games/games-list"

const Home = async () => {
  const result = await client.games.$get({ query: {} })
  const games = (await result.json()).result

  return (
    <div className="mx-auto w-full max-w-6xl px-8">
      <GamesList games={games} />
    </div>
  )
}

export default Home
