import GameCard from "@/components/games/game-card"
import type { Game } from "@/types/games"

type Props = {
  games: Game[]
}

const GamesList = ({ games }: Props) => (
  <div className="flex w-full flex-wrap justify-center gap-8">
    {games.map((game) => (
      <GameCard key={game.id} {...game} />
    ))}
  </div>
)

export default GamesList
