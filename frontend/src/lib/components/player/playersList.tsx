import { ListCard } from "../common";
import { useTournamentStore } from "@/lib/stores/tournament.store";

export function PlayerListCard() {
	const player_full_names = [
		...useTournamentStore((state) => state.players).values(),
	].map((player) => player.name + " " + player.last_name);

	return (
		<ListCard
			header="Gracze"
			items={player_full_names}
			show_all_path="./players"
		/>
	);
}
