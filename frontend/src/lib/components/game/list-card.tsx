import { ListCard } from "../common";

export function GameListCard() {
	return (
		<ListCard
			header="Aktywne gry"
			items={[
				"Chlost vs Michalak",
				"Piętka vs Zdrzałek",
				"Piętka vs Zdrzałek",
				"Piętka vs Zdrzałek",
				"Piętka vs Zdrzałek",
			]}
			show_all_path="./games"
		/>
	);
}
