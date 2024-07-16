import { ChessGame } from "@/types";
import { DeleteGame } from "./DeleteGame";
import { EditGame } from "./EditGame";
import { useTournamentStore } from "@/stores/tournament.store";

export function GameListItem({ game }: { game: ChessGame }) {
	const players = useTournamentStore((state) => state.players);

	return (
		<p className="border w-full p-2 font-bold rounded flex justify-between items-center">
			{players.get(game.white_code)?.last_name +
				" vs " +
				players.get(game.black_code)?.last_name}
			<div className="flex ">
				<EditGame game={game} />
				<DeleteGame game={game} />
			</div>
		</p>
	);
}
