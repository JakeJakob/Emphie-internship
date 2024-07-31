import { ChessGame } from "@/types";
import { DeleteGame } from "./DeleteGame";
import { EditGame } from "./EditGame";
import { useTournamentStore } from "@/stores/tournament.store";

export function GameListItem({ game }: { game: ChessGame }) {
  const players = useTournamentStore((state) => state.players);

  return (
    <p className="flex w-full items-center justify-between rounded border p-2 font-bold">
      {players.get(game.white_id)?.last_name +
        " vs " +
        players.get(game.black_id)?.last_name}
      <div className="flex">
        <EditGame game={game} />
        <DeleteGame game={game} />
      </div>
    </p>
  );
}
