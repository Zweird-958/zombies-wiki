import { client } from "@/api/client"
import GameCard from "@/components/games/game-card"
import ItemsLayout from "@/components/items/items-layout"

const Home = async () => {
  const result = await client.games.$get({ query: {} })
  const games = (await result.json()).result

  return (
    <ItemsLayout>
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </ItemsLayout>
  )
}

export default Home
