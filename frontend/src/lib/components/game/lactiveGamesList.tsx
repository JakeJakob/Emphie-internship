import { useTournamentStore } from "@/lib/stores/tournament.store";
import { ListCard } from "../common";

export function GameListCard() {
	const active_games = [
		...useTournamentStore((state) => state.games).values(),
	]
		.filter((game) => !game.winner_code || game.winner_code == "")
		.map((game) => game.white_code + " vs " + game.black_code);

	return (
		<ListCard
			header="Aktywne gry"
			items={active_games}
			show_all_path="./games"
		/>
	);
}
