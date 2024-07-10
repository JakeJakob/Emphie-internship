import { useTournamentStore } from "@stores/tournament.store";
import { ListCard } from "../common/ItemListCard";

export function GameListCard() {
	const players = useTournamentStore((state) => state.players) || new Map();
	const games = useTournamentStore((state) => state.games) || new Map();

	const versus_strings = [...games.values()]
		.filter((game) => !game.winner_code)
		.map(
			(game) =>
				players.get(game.white_code)?.last_name +
				" vs " +
				players.get(game.black_code)?.last_name
		);

	return (
		<ListCard
			header="Aktywne gry"
			items={versus_strings}
			show_all_path="./games"
		/>
	);
}
