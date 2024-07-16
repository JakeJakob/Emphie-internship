import { JudgeForm } from "./GameForm";
import { editGame } from "@api";
import { ChessGame } from "@types";
import editIcon from "/icons/edit.svg";
import { useTournamentStore } from "@/stores/tournament.store";

export function EditGame({ game }: { game: ChessGame }) {
	const players = useTournamentStore((state) => state.players);

	return (
		<JudgeForm
			title={
				players.get(game.white_code)?.last_name +
				" vs " +
				players.get(game.black_code)?.last_name
			}
			desc="Edycja gry."
			trigger={
				<button className="border rounded-md mx-4">
					<img src={editIcon} className="w-5 m-2" alt="Edit" />
				</button>
			}
			onSubmit={(game) => editGame(game.code || "", game)}
			initialGame={game}
		/>
	);
}
